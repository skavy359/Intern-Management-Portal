const internService = require('../services/intern.service');

function checkHealth(req, res) {
    internService.healthCheck(req, res);
}

async function getInternById(req, res) {
    const id = Number(req.params.id);

    if(id<=0 || isNaN(id)){
        return res.status(400).json({ message: "Invalid intern ID" });
    }
    try{
        const intern = await internService.getInternById(id);
        if (!intern) {
            return res.status(404).json({ message: "Intern not found" });
        }
        res.status(200).json(intern);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    checkHealth,
    getInternById
};