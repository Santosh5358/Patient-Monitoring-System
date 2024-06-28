let username = 'coalition';
let password = 'skills-test';
let auth = btoa(`${username}:${password}`);

// Fatch data using API 
fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
	headers: {
		'Authorization': `Basic ${auth}`
	}
}).then(response => response.json())
.then(data => {
    console.log(data);
    displayPatientData(data);
    const years = data.map(entry => entry.year);
    const systolicValues = data.map(entry => entry.systolic);
    const diastolicValues = data.map(entry => entry.diastolic);

    
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
                {
                    label: 'Diastolic',
                    data: diastolicValues,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'year',
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Blood Pressure',
                    },
                },
            },
        },
    });
})
.catch(error => console.error('Error fetching data:', error));

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

// Searching 
document.getElementById('UserInput').addEventListener('input', function() {
    const searchText = this.value.trim().toUpperCase();
    console.log(searchText);
    const rows = Array.from(document.querySelectorAll('#patientDetails #patientTableBody tr' ));
    rows.forEach(row => {
        const name = row.textContent.trim().toUpperCase();
        // console.log(name);  
        if (name.startsWith(searchText)) 
        {
            console.log(name);
            rows[0].style.display = '';
        }else 
        {
            rows[0].style.display = 'none';
            // alert("No Data Found....!");
            
        }
    });   
  });