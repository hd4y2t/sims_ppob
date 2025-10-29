import { Service } from "../models/service.js";

export const getData = async () => {
    return await Service.getData();
};

export const findService = async (serviceCode) => {
    return await Service.findByCode(serviceCode);
};