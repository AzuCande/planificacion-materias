import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    Box,
    Button,
    Chip,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import * as XLSX from "xlsx";

const App = () => {
    const [legajo, setLegajo] = React.useState("");
    const [carrera, setCarrera] = React.useState("");
    const [materias, setMaterias] = React.useState([] as string[]);
    const [materiasSeleccionadas, setMateriasSeleccionadas] = React.useState(
        [] as string[]
    );
    const [legajoError, setLegajoError] = React.useState(false);
    const [carreraError, setCarreraError] = React.useState(false);
    const [materiasError, setMateriasError] = React.useState(false);

    useEffect(() => {
        if (carrera === "") return;
        fetchMaterias(carrera);
    }, [carrera]);

    const fetchMaterias = async (carrera: string) => {
        const response = await fetch("./planificacion-materias.xlsx");
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[carrera];
        const materias = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const transformedMaterias = materias
            .slice(1)
            .map((row: any) => `${row[0].toFixed(2)} - ${row[1]}`);
        setMaterias(transformedMaterias);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCarrera(event.target.value as string);
    };

    const handleMultipleChange = (
        event: SelectChangeEvent<typeof materiasSeleccionadas>
    ) => {
        const {
            target: { value },
        } = event;
        setMateriasSeleccionadas(
            typeof value === "string" ? value.split(",") : value
        );
    };

    const deleteMateria = (materia: string) => {
        setMateriasSeleccionadas(
            materiasSeleccionadas.filter((m) => m !== materia)
        );
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLegajoError(legajo === "");
        setCarreraError(carrera === "");
        setMateriasError(materiasSeleccionadas.length === 0);

        if (
            legajo === "" ||
            carrera === "" ||
            materiasSeleccionadas.length === 0
        )
            return;

        try {
            // const response = await fetch("./planificacion-materias.xlsx");
            // const data = await response.arrayBuffer();
            // const workbook = XLSX.read(data, { type: "array" });
            // const worksheet = workbook.Sheets["Materias"];

            // const materias = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // materiasSeleccionadas.forEach((materia: string) =>
            //     materias.push([legajo, carrera, materia])
            // );

            // const newWorksheet = XLSX.utils.aoa_to_sheet(materias);
            // workbook.Sheets["Materias"] = newWorksheet;
            // const newWorkbook = XLSX.write(workbook, {
            //     bookType: "xlsx",
            //     type: "array",
            // });

            // const blob = new Blob([newWorkbook], {
            //     type: "application/octet-stream",
            // });
            // const url = URL.createObjectURL(blob);
            // const link = document.createElement("a");
            // link.href = url;
            // link.download = "planificacion-materias.xlsx";
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // create variable that will contain an array of objects with legajo, carrera and each materia

            console.log("MATERIAS SELECCIONADAS", materiasSeleccionadas);
            const dataToPost = materiasSeleccionadas.map((materia) => ({
                legajo,
                carrera,
                materia,
            }));
            console.log("DATA TO POST", dataToPost);
            const response = await fetch("http://localhost:8080/update-excel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToPost),
            });
        } catch (error) {
            console.error("Error al enviar el formulario", error);
        }
    };

    return (
        <>
            <div className="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <Container
                className="App"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <h1>Planificación de Materias</h1>
                <FormControl className="form-mui" sx={{ marginY: "2rem" }}>
                    <TextField
                        required
                        label="Legajo"
                        variant="outlined"
                        type="number"
                        value={legajo}
                        onChange={(e) => setLegajo(e.target.value)}
                        error={legajoError}
                        helperText={legajoError ? "Legajo requerido" : ""}
                    />
                </FormControl>
                <FormControl
                    sx={{ minWidth: 194, marginY: "2rem" }}
                    variant="outlined"
                >
                    <InputLabel id="carrera-label">Carrera</InputLabel>
                    <Select
                        labelId="carrera-label"
                        required
                        value={carrera}
                        onChange={handleChange}
                        error={carreraError}
                    >
                        <MenuItem value="BIO">Bioingeniería</MenuItem>
                        <MenuItem value="K">Ingeniería Electrónica</MenuItem>
                        <MenuItem value="S">Ingeniería en Informática</MenuItem>
                        <MenuItem value="P">Ingeniería en Petróleo</MenuItem>
                        <MenuItem value="I">Ingeniería Industrial</MenuItem>
                        <MenuItem value="M">Ingeniería Mecánica</MenuItem>
                        <MenuItem value="N">Ingeniería Naval</MenuItem>
                        <MenuItem value="Q">Ingeniería Química</MenuItem>
                        <MenuItem value="LAES">
                            Licenciatura en Analítica Empresarial
                        </MenuItem>
                        <MenuItem value="LN">Licenciatura en Negocios</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 194, marginY: "2rem" }}>
                    <InputLabel id="materias-label">Materias</InputLabel>
                    <Select
                        required
                        multiple
                        labelId="materias-label"
                        value={materiasSeleccionadas}
                        onChange={handleMultipleChange}
                        error={materiasError}
                    >
                        {materias.map((materia) => (
                            <MenuItem key={materia} value={materia}>
                                {materia}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "space-around",
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        marginY: "2rem",
                    }}
                >
                    {materiasSeleccionadas.map((materia) => (
                        <Chip
                            key={materia}
                            label={materia}
                            variant="outlined"
                            onDelete={() => deleteMateria(materia)}
                        />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    sx={{ marginY: "2rem" }}
                    onClick={handleSubmit}
                >
                    Enviar
                </Button>
            </Container>
        </>
    );
};

export default App;
