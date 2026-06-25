"use strict";
// ==========================================
// 1. DEFINICIÓN DE INTERFACES
// ==========================================
// ==========================================
// 2. FUNCIONES DE CÁLCULO
// ==========================================
// Calcula los días de estadía
function calcularDiasEstadia(fechaIngreso, fechaSalida) {
    const ingreso = new Date(fechaIngreso);
    const salida = new Date(fechaSalida);
    const diferenciaMs = salida.getTime() - ingreso.getTime();
    const dias = diferenciaMs / (1000 * 60 * 60 * 24);
    return dias;
}
// Calcula el costo base
function calcularCostoBase(tipoHabitacion, temporada, dias) {
    let precioPorNoche = 0;
    if (temporada === "alta") {
        if (tipoHabitacion === "simple")
            precioPorNoche = 120;
        else if (tipoHabitacion === "doble")
            precioPorNoche = 180;
        else
            precioPorNoche = 350;
    }
    else {
        if (tipoHabitacion === "simple")
            precioPorNoche = 80;
        else if (tipoHabitacion === "doble")
            precioPorNoche = 120;
        else
            precioPorNoche = 250;
    }
    return precioPorNoche * dias;
}
// Calcula el costo de servicios
function calcularCostoServicios(servicios, dias) {
    let costoPorDia = 0;
    servicios.forEach(servicio => {
        switch (servicio.toLowerCase()) {
            case "desayuno":
                costoPorDia += 25;
                break;
            case "wifi":
                costoPorDia += 10;
                break;
            case "spa":
                costoPorDia += 50;
                break;
            case "estacionamiento":
                costoPorDia += 15;
                break;
            case "lavanderia":
                costoPorDia += 20;
                break;
        }
    });
    return costoPorDia * dias;
}
// Calcula el descuento
function calcularDescuento(costoBase, costoServicios, tipoHuesped) {
    const total = costoBase + costoServicios;
    if (tipoHuesped === "vip") {
        return total * 0.15;
    }
    if (tipoHuesped === "corporativo") {
        return total * 0.10;
    }
    return 0;
}
// ==========================================
// 3. PROCESAMIENTO
// ==========================================
function procesarReservas(reservas) {
    const reportes = [];
    reservas.forEach(res => {
        const dias = calcularDiasEstadia(res.fechaIngreso, res.fechaSalida);
        const costoBase = calcularCostoBase(res.tipoHabitacion, res.temporada, dias);
        const costoServicios = calcularCostoServicios(res.serviciosAdicionales, dias);
        const descuento = calcularDescuento(costoBase, costoServicios, res.tipoHuesped);
        const costoTotal = costoBase + costoServicios - descuento;
        reportes.push({
            numeroReserva: res.numeroReserva,
            nombreHuesped: res.nombreHuesped,
            tipoHabitacion: res.tipoHabitacion,
            diasEstadia: dias,
            costoBase: costoBase,
            costoServicios: costoServicios,
            descuento: descuento,
            costoTotal: costoTotal
        });
    });
    return reportes;
}
// ==========================================
// 4. DATOS DE PRUEBA
// ==========================================
const reservasHotel = [
    {
        numeroReserva: "001",
        nombreHuesped: "Ana García",
        tipoHabitacion: "suite",
        fechaIngreso: "2024-07-15",
        fechaSalida: "2024-07-18",
        temporada: "alta",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "spa", "wifi"]
    },
    {
        numeroReserva: "002",
        nombreHuesped: "Juan Pérez",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-08-01",
        fechaSalida: "2024-08-05",
        temporada: "baja",
        tipoHuesped: "corporativo",
        serviciosAdicionales: ["wifi", "estacionamiento"]
    },
    {
        numeroReserva: "003",
        nombreHuesped: "María López",
        tipoHabitacion: "simple",
        fechaIngreso: "2024-09-10",
        fechaSalida: "2024-09-12",
        temporada: "baja",
        tipoHuesped: "regular",
        serviciosAdicionales: ["desayuno"]
    }
];
// ==========================================
// 5. MOSTRAR RESULTADOS
// ==========================================
const reportes = procesarReservas(reservasHotel);
console.log("===== REPORTE DE RESERVAS =====");
reportes.forEach(reporte => {
    console.log(reporte);
});
