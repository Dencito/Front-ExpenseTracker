import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { enviroments } from "../enviroments";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function GraphLine({filtro}) {
    const [expenses, setExpenses] = useState(null);
    const [filter, setFilter] = useState(filtro);
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const initialData = {
        labels: meses,
        datasets: [
            {
                label: `${filter === "week" ? "Gastos por semana" : filter === "month" ? "Gastos por meses" : "Gastos por años"}`,
                data: Array(12).fill(0),
                tension: 0.5,
                fill: true,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                pointRadius: 5,
                pointBorderColor: "rgba(255, 99, 132)",
                pointBackgroundColor: "rgba(255, 99, 132)",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                min: 0,
            },
            x: {
                ticks: { color: 'rgb(255, 99, 132)' },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    const [data, setData] = useState(initialData);

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const token = window.localStorage.getItem("token");
                const response = await fetch(`${enviroments.backend.urlLocal}/expense/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const dataExpenses = await response.json();
                const processedData = processExpenses(dataExpenses?.data, filter);
                const labels = getLabels(filter);
                setData({
                    ...initialData,
                    labels,
                    datasets: [
                        {
                            ...initialData.datasets[0],
                            data: processedData,
                        },
                    ],
                });

                setExpenses(dataExpenses?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getExpenses();
    }, [filter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    function processExpenses(expenses, filter) {
        if (!expenses) {
            return Array(12).fill(0);
        }

        switch (filter) {
            case "month":
                const monthlyExpenses = Array(12).fill(0);
                expenses.forEach((expense) => {
                    const date = new Date(expense.date);
                    const month = date.getMonth();
                    monthlyExpenses[month] += expense.amount;
                });
                return monthlyExpenses;

            case "week":
                const weeklyExpenses = Array(52).fill(0);
                expenses.forEach((expense) => {
                    const date = new Date(expense.date);
                    const week = getWeekNumber(date);
                    weeklyExpenses[week - 1] += expense.amount;
                });
                return weeklyExpenses;

            case "year":
                const yearlyExpenses = {};
                expenses.forEach((expense) => {
                    const date = new Date(expense.date);
                    const year = date.getFullYear();
                    if (!yearlyExpenses[year]) {
                        yearlyExpenses[year] = 0;
                    }
                    yearlyExpenses[year] += expense.amount;
                });
                return Object.values(yearlyExpenses);

            default:
                return [];
        }
    }

    function getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    function getLabels(filter) {
        switch (filter) {
            case "month":
                return meses;

            case "week":
                const weekLabels = [];
                for (let i = 1; i <= 52; i++) {
                    weekLabels.push(`Semana ${i}`);
                }
                return weekLabels;

            case "year":
                const years = new Set();
                if (expenses) {
                    expenses.forEach((expense) => {
                        const date = new Date(expense.date);
                        const year = date.getFullYear();
                        years.add(year);
                    });
                }
                return Array.from(years);
            default:
                return [];
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Filtros</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        label="Filtros"
                    >
                        <MenuItem value="month">Mes</MenuItem>
                        <MenuItem value="week">Semana</MenuItem>
                        <MenuItem value="year">Año</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}

