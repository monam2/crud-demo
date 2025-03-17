import * as clientServices from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientServices.getClients();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientServices.createClient(clientData);
    res.status(200).json(newClient);
  } catch (err) {
    console.error("Error fetching client: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const updateClient = await clientServices.updateClient(clientData, id);

    if (!updateClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updateClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
