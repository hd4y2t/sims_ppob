export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

const generateInvoice = (lastInvoiceNumber) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const datePart = dd + mm + yyyy;

    const nextNumber = String(lastInvoiceNumber + 1).padStart(3, '0');

    return `INV${datePart}-${nextNumber}`;
};