
// ==========================================
// 1. DEFINICIÓN DE INTERFACES
// ==========================================

interface Reserva {
    numeroReserva: string;
    nombreHuesped: string;
    tipoHabitacion: "simple" | "doble" | "suite";
    fechaIngreso: string; // Formato YYYY-MM-DD
    fechaSalida: string;  // Formato YYYY-MM-DD
    temporada: "alta" | "baja";
    tipoHuesped: "regular" | "vip" | "corporativo";
    serviciosAdicionales: string[];
}

interface ReporteReserva {
    numeroReserva: string;
    nombreHuesped: string;
    tipoHabitacion: string;
    diasEstadia: number;
    costoBase: number;
    costoServicios: number;
    descuento: number;
    costoTotal: number;
}

// ==========================================
// 2. FUNCIONES DE CÁLCULO
// ==========================================

// Calcula los días de estadía
function calcularDiasEstadia(fechaIngreso: string, fechaSalida: string): number {
    const ingreso = new Date(fechaIngreso);
    const salida = new Date(fechaSalida);

    const diferenciaMs = salida.getTime() - ingreso.getTime();
    const dias = diferenciaMs / (1000 * 60 * 60 * 24);

    return dias;
}

// Calcula el costo base
function calcularCostoBase(
    tipoHabitacion: "simple" | "doble" | "suite",
    temporada: "alta" | "baja",
    dias: number
): number {

    let precioPorNoche = 0;

    if (temporada === "alta") {
        if (tipoHabitacion === "simple") precioPorNoche = 120;
        else if (tipoHabitacion === "doble") precioPorNoche = 180;
        else precioPorNoche = 350;
    } else {
        if (tipoHabitacion === "simple") precioPorNoche = 80;
        else if (tipoHabitacion === "doble") precioPorNoche = 120;
        else precioPorNoche = 250;
    }

    return precioPorNoche * dias;
}

// Calcula el costo de servicios
function calcularCostoServicios(servicios: string[], dias: number): number {

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
function calcularDescuento(
    costoBase: number,
    costoServicios: number,
    tipoHuesped: "regular" | "vip" | "corporativo"
): number {

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

function procesarReservas(reservas: Reserva[]): ReporteReserva[] {

    const reportes: ReporteReserva[] = [];

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

const reservasHotel: Reserva[] = [
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
        nombreHuesped: "Carlos López",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-09-10",
        fechaSalida: "2024-09-13",
        temporada: "baja",
        tipoHuesped: "corporativo",
        serviciosAdicionales: ["desayuno", "wifi", "estacionamiento"]
    },
    {
        numeroReserva: "003",
        nombreHuesped: "María Rodríguez",
        tipoHabitacion: "simple",
        fechaIngreso: "2024-08-20",
        fechaSalida: "2024-08-22",
        temporada: "alta",
        tipoHuesped: "regular",
        serviciosAdicionales: ["wifi"]
    },
    {
        numeroReserva: "004",
        nombreHuesped: "Juan Pérez",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-06-01",
        fechaSalida: "2024-06-07",
        temporada: "baja",
        tipoHuesped: "vip",
        serviciosAdicionales: [
            "desayuno",
            "wifi",
            "lavanderia",
            "estacionamiento"
        ]
    }
];

// ==========================================
// 5. GENERAR REPORTE
// ==========================================

const reportes = procesarReservas(reservasHotel);

let ingresosTotales = 0;

let simples = 0;
let dobles = 0;
let suites = 0;

console.log("=====================================");
console.log("     REPORTE DE RESERVAS HOTEL");
console.log("=====================================");

reportes.forEach(reporte => {

    console.log(`\nReserva #${reporte.numeroReserva}`);
    console.log(`Huésped: ${reporte.nombreHuesped}`);
    console.log(`Habitación: ${reporte.tipoHabitacion}`);
    console.log(`Estadía: ${reporte.diasEstadia} días`);
    console.log(`Costo base: $${reporte.costoBase}`);
    console.log(`Servicios: $${reporte.costoServicios}`);
    console.log(`Descuento: $${reporte.descuento}`);
    console.log(`TOTAL: $${reporte.costoTotal}`);

    ingresosTotales += reporte.costoTotal;

    switch (reporte.tipoHabitacion) {
        case "simple":
            simples++;
            break;

        case "doble":
            dobles++;
            break;

        case "suite":
            suites++;
            break;
    }
});

console.log("\n=====================================");
console.log(`INGRESOS TOTALES: $${ingresosTotales}`);
console.log(`RESERVAS PROCESADAS: ${reportes.length}`);
console.log("=====================================");
console.log(`Habitaciones simples: ${simples}`);
console.log(`Habitaciones dobles: ${dobles}`);
console.log(`Habitaciones suite: ${suites}`);
console.log("=====================================");