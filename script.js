let username = 'coalition';
let password = 'skills-test';
let auth = btoa(`${username}:${password}`);
dummydata = [
    {
      "name": "Emily Williams",
      "gender": "Female",
      "age": 18,
      "date_of_birth": "2006-08-19",
      "diagnosis_history": [
        {
          "blood_pressure": {
            "diastolic": {
              "levels": "Normal",
              "value": 95
            },
            "systolic": {
              "levels": "Higher than Average",
              "value": 163
            }
          },
          "heart_rate": {
            "value": 79,
            "levels": "Lower than Average"
          },
          "respiratory_rate": {
            "value": 27,
            "levels": "Normal"
          },
          "temperature": {
            "value": 103,
            "levels": "Higher than Average"
          },
          "month": "March",
          "year": 2024
        }
      ],
      "diagnostic_list": [
        {
          "name": "Type 2 Diabetes",
          "description": "A chronic condition that affects the way the body processes blood sugar (glucose).",
          "status": "Actively being treated"
        },
        {
          "name": "Hypertension",
          "description": "A condition in which the force of the blood against the artery walls is too high.",
          "status": "Under observation"
        }
      ],
      "emergency_contact": "(680) 653-9512",
      "insurance_type": "Premier Auto Corporation",
      "lab_results": [
        "Complete Blood Count (CBC)",
        "Echocardiogram",
        "Liver Function Tests",
        "Mammography",
        "Urinalysis",
        "Ultrasound",
        "Prostate-Specific Antigen (PSA)",
        "Hemoglobin A1C",
        "Lipid Panel",
        "Radiology Report"
      ],
      "profile_picture": "https://fedskillstest.ct.digital/1.png"
    },
    {
      "name": "Ryan Johnson",
      "gender": "Male",
      "age": 45,
      "date_of_birth": "1979-11-02",
      "diagnosis_history": [
        {
          "blood_pressure": {
            "diastolic": {
              "levels": "Normal",
              "value": 80
            },
            "systolic": {
              "levels": "Normal",
              "value": 120
            }
          },
          "heart_rate": {
            "value": 72,
            "levels": "Normal"
          },
          "respiratory_rate": {
            "value": 18,
            "levels": "Normal"
          },
          "temperature": {
            "value": 98.6,
            "levels": "Normal"
          },
          "month": "February",
          "year": 2024
        }
      ],
      "diagnostic_list": [
        {
          "name": "Type 2 Diabetes",
          "description": "A chronic condition that affects the way the body processes blood sugar (glucose).",
          "status": "Untreated"
        },
        {
          "name": "Hypertension",
          "description": "A condition in which the force of the blood against the artery walls is too high.",
          "status": "Under observation"
        }
      ],
      "emergency_contact": "(711) 984-6696",
      "insurance_type": "Basic Health Coverage",
      "lab_results": [
        "Complete Blood Count (CBC)",
        "Echocardiogram",
        "Liver Function Tests",
        "Mammography",
        "Urinalysis",
        "Ultrasound",
        "Prostate-Specific Antigen (PSA)",
        "Hemoglobin A1C",
        "Lipid Panel",
        "Radiology Report"
      ],
      "profile_picture": "https://fedskillstest.ct.digital/2.png"
    },
    {
      "name": "Brandon Mitchell",
      "gender": "Male",
      "age": 36,
      "date_of_birth": "1988-11-17",
      "diagnosis_history": [
        {
          "blood_pressure": {
            "diastolic": {
              "levels": "Normal",
              "value": 90
            },
            "systolic": {
              "levels": "Higher than Average",
              "value": 150
            }
          },
          "heart_rate": {
            "value": 76,
            "levels": "Normal"
          },
          "respiratory_rate": {
            "value": 20,
            "levels": "Normal"
          },
          "temperature": {
            "value": 98.6,
            "levels": "Normal"
          },
          "month": "January",
          "year": 2024
        }
      ],
      "diagnostic_list": [
        {
          "name": "Type 2 Diabetes",
          "description": "A chronic condition that affects the way the body processes blood sugar (glucose).",
          "status": "Under observation"
        },
        {
          "name": "Hypertension",
          "description": "A condition in which the force of the blood against the artery walls is too high.",
          "status": "Actively being treated"
        }
      ],
      "emergency_contact": "(680) 653-9512",
      "insurance_type": "Premium Health Plan",
      "lab_results": [
        "Complete Blood Count (CBC)",
        "Echocardiogram",
        "Liver Function Tests",
        "Mammography",
        "Urinalysis",
        "Ultrasound",
        "Prostate-Specific Antigen (PSA)",
        "Hemoglobin A1C",
        "Lipid Panel",
        "Radiology Report"
      ],
      "profile_picture": "https://fedskillstest.ct.digital/3.png"
    }
  ]
  

fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    headers: {
        'Authorization': `Basic ${auth}`
    }
}).then(response => response.json())
.then(data => {
    console.log('API Response:', data);  // Log the full API response
    displayPatientData(data);

})
.catch(error => {
    console.error('Error fetching data:', error);
    console.log('Using dummy data due to error');
    displayPatientData(dummydata);  // Use dummy data as fallback
});

let bloodPressureChart = null;

function updateChart(patientData) {
    // Extract years from the data
    const years = patientData.map(entry => entry.year);

    // Extract systolic and diastolic blood pressure values
    const systolic = patientData.map(entry => entry.blood_pressure.systolic.value || 0);  // Extract systolic value
    const diastolic = patientData.map(entry => entry.blood_pressure.diastolic.value || 0);  // Extract diastolic value

    // Check for invalid data
    if (systolic.includes(NaN) || diastolic.includes(NaN)) {
        console.error('Invalid data in systolic or diastolic values.');
        return;
    }

    // Destroy the previous chart if it exists
    if (bloodPressureChart) {
        bloodPressureChart.destroy();
    }

    // Get the chart context
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');

    // Create a new chart
    bloodPressureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,  // X-axis: years
            datasets: [
                {
                    label: 'Systolic Blood Pressure',
                    data: systolic,  // Y-axis: systolic data
                    borderColor: 'rgba(255, 99, 132, 1)',  // Red line for systolic
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Diastolic Blood Pressure',
                    data: diastolic,  // Y-axis: diastolic data
                    borderColor: 'rgba(54, 162, 235, 1)',  // Blue line for diastolic
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Blood Pressure (mmHg)'
                    }
                }
            }
        }
    });
}





function displayPatientData(data) {
    const patientDetailsDiv = document.getElementById('patientDetails');
    const tableBody = document.getElementById('patientTableBody');
    data.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${patient.profile_picture}" style="transparent"><td>
            <div style="margin-top=5px;">
                <td>${patient.name}</td>
                <td>${patient.gender}</td>
                <td>${patient.age}</td>
            </div>
            
        `;

        row.addEventListener('click', () => clearDiagnosticList()); //clear previous data
        row.addEventListener('click', () => clearLabResult()); //clear previous data
        row.addEventListener('click', () => clearHistory()); //clear previous data
        row.addEventListener('click', () => showFullPatientDetails(patient)); 
        row.addEventListener('click', () => showLabResults(patient));
        row.addEventListener('click', () => showdiagnosisHistory(patient));
        row.addEventListener('click', () => showDiagnosticList(patient));
        row.addEventListener('click', () => updateChart(patient.diagnosis_history));
        
        
        tableBody.appendChild(row);

    });
}

// Show Full Patient Details
function showFullPatientDetails(patient) {
    
    const fullDetails = getFullPatientDetails(patient);

    const fullPatientDetailsDiv = document.getElementById('fullPatientDetails');
    fullPatientDetailsDiv.innerHTML = `
        <img src="${patient.profile_picture}" style="transparent">
        <h2>${patient.name}</h2>
        <p>Date Of Birth <br> ${patient.date_of_birth}</p>
        <p>Gender <br> ${patient.gender}</p>
        <p>Contact Info. <br> ${patient.phone_number}</p>
        <p>Emergency Contacts  <br> ${patient.emergency_contact}</p>
        <p>Insurance Provider: ${patient.insurance_type}</p>
        <div style="display: flex; justify-content: center; align-items: center;">
        <button type="button" style="background-color:#01F0D0; border-radius:10px">Show All Information</button></div>
    `;
}
// Show Full Patient Details
function getFullPatientDetails(patient) {
    return {
    };
}

// show Diagnostic History
function showdiagnosisHistory(patient) {
    const fullDetails = getdiagnosticHistory(patient);

    const history = document.getElementById('diagnosis_history');
    const RespiratoryRate=document.getElementById("RespiratoryRate");
    const temp=document.getElementById("Temperature");
    const heart=document.getElementById("HeartRate");
    const data=patient.diagnosis_history[0];
    console.log(data);
        const row = document.createElement('tc');
        const row1 = document.createElement('tc');
        const row2 = document.createElement('tc');
        
        row.innerHTML = `
                <td><img src="image/HeartBPM.png" alt="" style="background: transparent  0% 0% no-repeat padding-box; top: 549px;
                left: 702px;
                width: 96px;
                height: 96px;"></td><br>
                <td>${data.heart_rate.value}</td><br>
                <td>${data.heart_rate.levels}</td>
                
            
        `;
        row1.innerHTML = `
                <td><img src="image/respiratory rate.png" alt=""  style="background: transparent  0% 0% no-repeat padding-box; top: 549px;
                left: 702px;
                width: 96px;
                height: 96px;"></td><br>
                <td>${data.respiratory_rate.value}</td><br>
                <td>${data.respiratory_rate.levels}</td>
                
            
        `;
        row2.innerHTML = `
                <td><img src="image/temperature.png" alt="" style="background: transparent  0% 0% no-repeat padding-box; top: 549px;
                left: 702px;
                width: 96px;
                height: 96px;"></td><br>
                <td>${data.temperature.value}</td><br>
                <td>${data.temperature.levels}</td>
                
            
        `;
        RespiratoryRate.appendChild(row1);
        temp.appendChild(row2);
        heart.appendChild(row);
}
// show Diagnostic History
function getdiagnosticHistory(patient) {

    return {
        
    };
}
// Clear History reports
function clearHistory() {
    const RespiratoryRate = document.getElementById('RespiratoryRate');
    const Temp = document.getElementById('Temperature');
    const hart = document.getElementById('HeartRate');

    while (RespiratoryRate.firstChild ) {
        RespiratoryRate.removeChild(RespiratoryRate.firstChild);

        
        
    }
    while(Temp.firstChild ){
        Temp.removeChild(Temp.firstChild);
        
    }
    while(hart.firstChild){
        hart.removeChild(hart.firstChild);

    }
}

// show Giagnostic List
function showDiagnosticList(patient) {
    const fullDetails = getDiagnosticList(patient);

    const DiagnosticList = document.getElementById('DiagnosticList');
    const DiagnosticListBody=document.getElementById('DiagnosticBody');    
    patient.diagnostic_list.forEach(patients => {
    const row = document.createElement('tr');
    row.innerHTML = `
    
            <td>${patients.name}</td>
            <td>${patients.description}</td>
            <td>${patients.status}</td>
        
    `;
    DiagnosticListBody.appendChild(row);
    });

}
// show Giagnostic List
function getDiagnosticList(patient){
    return {
        
    };
}

// clear previous data
function clearDiagnosticList() {
    const DiagnosticListBody = document.getElementById('DiagnosticBody');
    while (DiagnosticListBody.firstChild) {
        DiagnosticListBody.removeChild(DiagnosticListBody.firstChild);
    }
}

// show Lab Results
function showLabResults(patient) {
    
    const fullDetails = getLabResults(patient);

    const labResults = document.getElementById('LabResults');
    patient.lab_results.forEach(patients => {
        const row = document.createElement('tr');
        row.innerHTML = `
        
                <td>${patients}</td>
                <a href="your-file-url" download><img src="image/download_FILL0_wght300_GRAD0_opsz24 (1).png" alt="" style="display: flext; top: 115px;"></a>

               
            
        `;
        labResults.appendChild(row);
        });
    
}

// show Lab Results
function getLabResults(patient){
    return {
        
    };
}
// clear previous data

function clearLabResult() {
    const DiagnosticListBody = document.getElementById('LabResults');
    while (DiagnosticListBody.firstChild) {
        DiagnosticListBody.removeChild(DiagnosticListBody.firstChild);
    }
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase().trim();

  if (query.length === 0) {
    document.getElementById('fullPatientDetails').innerHTML = ''; // Clear when input is empty
    return;
  }

  const matchedPatient = patients.find(patient =>
    patient.name.toLowerCase().includes(query)
  );

  if (matchedPatient) {
    showFullPatientDetails(matchedPatient);
  } else {
    document.getElementById('fullPatientDetails').innerHTML = '<p>No patient found.</p>';
  }
});


async function setElementStyles(el, styles) {
  for (const [key, value] of Object.entries(styles)) {
    el.style[key] = value;
  }
}
function setupPagination(tableBodyId, rowsPerPage = 5) {
  const tableBody = document.getElementById(tableBodyId);
  if (!tableBody) {
    console.error(`Table body with ID '${tableBodyId}' not found.`);
    return;
  }

  const rows = Array.from(tableBody.querySelectorAll('tr'));
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  let currentPage = 1;

  function showPage(pageNumber) {
    currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRows);

    rows.forEach((row, index) => {
      if (index >= startIndex && index < endIndex) {
        setElementStyles(row, { display: 'table-row' });
      } else {
        setElementStyles(row, { display: 'none' });
      }
    });
      updatePaginationControls();
  }

  function createPaginationControls() {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    // Previous button
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.textContent = 'Previous';
    prevButton.id = 'prevButton';
    prevButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
    paginationContainer.appendChild(prevButton);

    // Numbered links
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = i;
      link.id = `pageLink-${i}`;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showPage(i);
      });
      paginationContainer.appendChild(link);
    }

    // Next button
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.textContent = 'Next';
    nextButton.id = 'nextButton';
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });
    paginationContainer.appendChild(nextButton);
    return paginationContainer;
  }

    function updatePaginationControls() {
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');

        if (currentPage === 1) {
          prevButton.style.display = 'none';
        } else {
          prevButton.style.display = 'inline';
        }

        if (currentPage === totalPages) {
          nextButton.style.display = 'none';
        } else {
          nextButton.style.display = 'inline';
        }
        for (let i = 1; i <= totalPages; i++) {
            const link = document.getElementById(`pageLink-${i}`);
            if(currentPage === i){
                link.style.fontWeight = 'bold';
                link.style.color = 'blue';
            } else {
                link.style.fontWeight = 'normal';
                link.style.color = 'black';
            }
        }
  }

  // Initial setup
  showPage(1);

  // Create and append pagination controls after the table
  const paginationControls = createPaginationControls();
  tableBody.closest("table").after(paginationControls);
}

// Call the function
setupPagination('patientTableBody', 5);
