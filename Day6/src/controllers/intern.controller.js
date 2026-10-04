const internService = require('../services/intern.service');
const {successResponse,errorResponse} = require('../utils/response');

function checkHealth(req, res) {
    return res.status(200).json(
        { message: "Intern API is healthy" }
    );
}

async function getInternById(req, res) {
    const id = Number(req.params.id);

    if (id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid intern ID" });
    }
    try {
        const intern = await internService.getInternById(id);
        if (!intern) {
            return res.status(404).json({ message: "Intern not found" });
        }
        res.status(200).json(intern);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllInterns(req, res) {
    try{
        const rawLimit = req.query.limit;
        const rawOffset = req.query.offset;

        const limit = rawLimit === undefined ? 20 : Number(rawLimit);
        const offset = rawOffset === undefined ? 0 : Number(rawOffset);

        if(isNaN(limit) || limit<=0){
            return errorResponse(res, 400, "Invalid limit value");
        }
        if(isNaN(offset) || offset<0){
            return errorResponse(res, 400, "Invalid offset value");
        }

        if(limit>100){
            return errorResponse(res, 400, "Limit value cannot exceed 100");
        }

        const interns = await internService.getAllInterns({limit,offset});
        return res.status(200).json({
            success: true,
            data: interns,
            pagination: {
                limit: limit,
                offset: offset,
                total: interns.length,
                hasMore: interns.length === limit
            }
        });
    }
    catch(error){
        console.error("Error fetching interns:", error);
        return errorResponse(res, 500, error.message);
    }
}

async function createIntern(req, res){
    const validation = internService.validateInternInput(req.body);

    if(!validation.valid){
        return res.status(400).json({ message: validation.message });
    }

    try{
        const newIntern = await internService.createIntern(req.body);
        res.status(201).json({
            success: true,
            data: newIntern
        });
    }
    catch(error){
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({ message: "Email already exists" });
        }
        res.status(500).json({ error: error.message });
    }
}

async function updateIntern(req, res){
    const id = Number(req.params.id);

    if (id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid intern ID" });
    }

    const validation = internService.validateInternInput(req.body);

    if(!validation.valid){
        return res.status(400).json({ message: validation.message });
    }

   const { name, email, role } = req.body;

   try{
        const updatedIntern = await internService.updateIntern(id, {
            name: name.trim(),
            email: email.trim(),
            role: role.trim()
        });
       
        if(!updatedIntern){
            return res.status(404).json({ message: "Intern not found" });
        }  

        res.status(200).json({
            success: true,
            data: updatedIntern
        });
    }

    catch(error){
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({ message: "Email already exists" });
        }
        res.status(500).json({ error: error.message });
   }
}

async function disableIntern(req, res){
    const id = Number(req.params.id);

    if (id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid intern ID" });
    }

    try{
        const result = await internService.disableIntern(id);

        if(result.message === "Intern not found"){
            return res.status(404).json({ message: "Intern not found" });
        }

        res.status(200).json({
            success: true,
            message: result.message
        });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function searchIntern(req, res){
    const keyword = req.query.keyword;

    if(!keyword || keyword.trim().length === 0){
        return res.status(400).json({ message: "Keyword is required" });
    }

    try{
        const interns = await internService.searchIntern(keyword.trim());
        res.status(200).json({
            success: true,
            data: interns
        });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    checkHealth,
    getInternById,
    getAllInterns,
    createIntern,
    updateIntern,
    disableIntern,
    searchIntern
};