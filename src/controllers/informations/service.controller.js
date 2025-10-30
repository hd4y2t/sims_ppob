import { getData } from "../../services/informations/service.service.js";
import { success, error } from "../../utils/response.js";

export const getDataService = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
        }

        const data = await getData();
        const mappedServices = data.map(mapService);

        return success(res, "Sukses", 200, mappedServices);
    } catch (err) {
        return error(res, err.message, 500);
    }
};

const mapService = (service) => {
    if (!service) return null;

    return {
        service_code: service.service_code,
        service_name: service.service_name,
        service_icon: service.service_icon,
        service_tariff: service.service_tariff,
    };
};