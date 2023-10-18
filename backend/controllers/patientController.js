const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    return res.json(patient);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating patient' });
  }
};

// Read all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    return res.json(patients);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching patients' });
  }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Patient.update(req.body, {
      where: { id },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Patient not found or no changes made' });
    }
    return res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating patient' });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Patient.destroy({
      where: { id },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    return res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting patient' });
  }
};


// exports.getPatientById = async (req, res) => {
//   const { id } = req.params; // Extract the patient ID from the request parameters
//   try {
//     // Use the `findOne` method to find the patient by their ID
//     const patient = await Patient.findOne({ where: { id } });

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     return res.json(patient);
//   } catch (error) {
//     return res.status(500).json({ error: 'Error fetching patient' });
//   }
// };

// patientController.js

// Import your Patient model and other necessary modules

// Get a patient by ID with custom responses based on temperature
exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    // Use the `findOne` method to find the patient by their ID
    const patient = await Patient.findOne({ where: { id } });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Extract the temperature from the patient data
    const temperature = patient.temperature;

    let message = '';

    if (temperature < 34) {
      message = 'Patient is dead';
    } else if (temperature >= 34 && temperature < 35) {
      message = 'Patient is sick';
    } else if (temperature > 37 && temperature <= 40) {
      message = 'Patient is sick';
    } else if (temperature > 40) {
      message = 'Patient is dead';
    } else {
      message = 'Patient is stable';
    }

    // Create a response object that includes the patient data and the custom message
    const response = {
      message,
      patient,
    };

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching patient' });
  }
};
