import { getData } from "../../services/informations/banner.service.js";
import { success, error } from "../../utils/response.js";

export const getDataBanner = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
        }

        const data = await getData();
        const mappedBanners = data.map(mapBanner);

        return success(res, "Sukses", 200, mappedBanners);
    } catch (err) {
        return error(res, err.message, 500);
    }
};

const mapBanner = (banner) => {
    if (!banner) return null;

    return {
        banner_name: banner.banner_name,
        banner_image: banner.banner_image,
        description: banner.description,
    };
};
