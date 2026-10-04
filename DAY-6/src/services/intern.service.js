const internRepo = require("../repository/intern.repository")

async function getAllInterns({limit,offset}){
    return internRepo.findAll({limit,offset});
}

async function getInternById(id){
    return internRepo.findById(id);
}

function validateInternInput(body) {
    const { name, email, role } = body;

    if(typeof name !== 'string' || name.trim().length === 0) {
        return { valid: false, message: "Invalid name" };
    }

    if(typeof email !== 'string' || !email.includes('@')) {
        return { valid: false, message: "Invalid email" };
    }

    if(typeof role !== 'string' || role.trim().length === 0) {
        return { valid: false, message: "Invalid role" };
    }

    return { valid: true, message: "Valid input" };
}

async function createIntern(intern){
    return internRepo.createIntern(intern);
}

async function updateIntern(id, intern){
    const existingIntern = await internRepo.findById(id);
    if(!existingIntern){
        throw new Error("Intern not found");
    }

    await internRepo.updateIntern(id, intern);

    return internRepo.findById(id);
}

async function disableIntern(id){
    const existingIntern = await internRepo.findById(id);

    if(!existingIntern){
        return { message: "Intern not found" };
    }

    await internRepo.disableIntern(id);

    return { message: "Intern disabled successfully" };
}

async function searchIntern(keyword){
    return internRepo.searchIntern(keyword);
}

module.exports={
    getAllInterns,
    getInternById,
    validateInternInput,
    createIntern,
    updateIntern,
    disableIntern,
    searchIntern
}