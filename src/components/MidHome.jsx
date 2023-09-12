import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CalculateIcon from '@mui/icons-material/Calculate';
import NotificationsIcon from '@mui/icons-material/Notifications';

const MidHome = () => {
    return (
        <div className="d-flex flex-column flex-lg-row align-items-center">
            <div className="p-2 p-lg-5 col-12 col-lg-6">
                <h2 className='mb-2 h1'>Beneficios de Expense Tracking</h2>
                <p className='mb-5'>Expense Tracking simplifica la gestión financiera al permitirte controlar tus gastos de cerca, gestionar tus ingresos, obtener una visión general en tiempo real de tus finanzas y recibir alertas para mantener tus finanzas en orden.</p>
                <Button color="primary" variant="outlined"><Link to="/gastos" className='link'>Leer Mas</Link></Button>
            </div>
            <div className="d-flex p-3 flex-column flex-lg-row col-12 col-sm-10 col-lg-6">
                <div className="col-12 col-lg-6">
                    <Card icon={<CurrencyExchangeIcon sx={{mb:1, color: "green"}}/>} color="text-primary" title="Control Total de Tus Gastos" description="Categoriza y registra tus gastos detalladamente para tomar decisiones financieras más informadas." />
                    <Card icon={<CalculateIcon sx={{mb:1, color: "red"}}/>} color="text-secondary" title="Gestión de Ingresos" description="Registra tus ingresos para calcular tu saldo disponible y planificar tus finanzas de manera efectiva."/>
                </div>
                <div className="col-12 col-lg-6">
                    <Card icon={<TrackChangesIcon sx={{mb:1, color: "red"}}/>}  color="text-success" title="Visión General en Tiempo Real" description="Obtén una vista rápida de tus saldos actuales y resumen de transacciones en tiempo real."/>
                    <Card icon={<NotificationsIcon sx={{mb:1, color: "yellow"}}/>} color="text-danger" title="Notificaciones y Alertas Personalizadas" description="Configura recordatorios para fechas de pago, vencimientos de facturas y eventos financieros importantes, evitando retrasos y cargos adicionales."/>
                </div>
            </div>
        </div>
    )
}

const Card = ({color, title , description, icon}) => {
    return (
        <div className="card p-3 m-2">
            {icon}
            <h3 className='h5 font-bold'>{title}</h3>
            <p className='h6'>{description}</p>
        </div>
    )
}


export default MidHome