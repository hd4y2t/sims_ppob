export const success = (res, message = "Success", code = 200, data = null) => {
    return res.status(code).json({
        status: 0,
        message,
        data
    });
};

export const error = (res, message = "Error", code = 500) => {
    let finalCode = code;

    const codeStr = String(code);

    if (codeStr.startsWith("4")) {
        finalCode = Number("1" + codeStr.slice(1));
    }

    const httpStatus =
        code >= 100 && code < 600 && code !== 102 ? code : 400;

    return res.status(httpStatus).json({
        status: finalCode,
        message,
        data: null
    });
};