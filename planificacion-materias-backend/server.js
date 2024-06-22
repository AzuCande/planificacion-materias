// backend/server.js
const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer();

// Manually set CORS headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });
  

// Serve the public folder
app.use(express.static(path.join(__dirname, 'planificacion-materias-frontend', 'build')));

app.use(express.json());

app.post('/update-excel', upload.none(), (req, res) => {
    const data = req.body;
  
    const filePath = path.join(__dirname, "..", "planificacion-materias-frontend", 'public', 'planificacion-materias.xlsx');
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['Materias'];
  
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    data.forEach((item) => {
      jsonData.push([item.legajo, item.carrera, item.materia]);
    });
  
    const newWorksheet = XLSX.utils.aoa_to_sheet(jsonData);
    workbook.Sheets['Materias'] = newWorksheet;
    XLSX.writeFile(workbook, filePath);
  
    res.json({ message: 'Excel file updated successfully' });
  });
  

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});