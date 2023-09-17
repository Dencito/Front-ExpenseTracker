import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { enviroments } from '../enviroments';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Pies() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = window.localStorage.getItem("token");

                // Obtener las categorías
                const responseCategories = await fetch(`${enviroments.backend.urlLocal}/expensecategory`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const dataCategories = await responseCategories.json();
                setCategories(dataCategories?.data);

                // Obtener los gastos
                const responseExpenses = await fetch(`${enviroments.backend.urlLocal}/expense-user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const dataExpenses = await responseExpenses.json();
                setExpenses(dataExpenses?.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Procesar los datos para el gráfico de pastel
    function processDataForPieChart() {
        if (!expenses || !categories) {
            return { labels: [], data: [] };
        }

        // Crear un mapa de categorías para acceder a ellas por su ID
        const categoryMap = new Map();
        categories.forEach((category) => {
            categoryMap.set(category.id, category.categoryName);
        });

        // Inicializar un mapa para el total de gastos por categoría
        const categoryExpensesMap = new Map();

        // Calcular el total de gastos por categoría
        expenses.forEach((expense) => {
            const categoryId = expense.categoryID;
            const amount = expense.amount;
            const categoryName = categoryMap.get(categoryId);

            if (categoryExpensesMap.has(categoryName)) {
                categoryExpensesMap.set(categoryName, categoryExpensesMap.get(categoryName) + amount);
            } else {
                categoryExpensesMap.set(categoryName, amount);
            }
        });

        // Crear las etiquetas y datos para el gráfico de pastel
        const labels = [...categoryExpensesMap.keys()];
        const data = [...categoryExpensesMap.values()];

        return { labels, data };
    }

    const pieChartData = processDataForPieChart();

    var data = {
        labels: pieChartData.labels,
        datasets: [
            {
                data: pieChartData.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} options={options} />;
}
