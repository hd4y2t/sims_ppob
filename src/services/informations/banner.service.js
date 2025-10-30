import { Banner } from "../../models/banner.js";

export const getData = async () => {
    return await Banner.getData();
};
