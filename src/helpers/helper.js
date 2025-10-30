export const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const generateInvoice = (lastInvoiceNumber) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const datePart = dd + mm + yyyy;

    const nextNumber = String(lastInvoiceNumber + 1).padStart(3, '0');

    return `INV${datePart}${nextNumber}`;
};

export const mapUserProfile = (dataUser) => {
    if (!dataUser) return null;

    return {
        first_name: dataUser.first_name,
        last_name: dataUser.last_name,
        email: dataUser.email,
        profile_image: `${process.env.BASE_URL}${dataUser.profile_image}`
    };
};

export const mapTransaction = (transaction) => {
    if (!transaction) return null;

    return {
        invoice_number: transaction.invoice_number,
        transaction_type: transaction.transaction_type,
        description: transaction.description,
        total_amount: parseFloat(transaction.total_amount),
        created_on: transaction.created_at,
    };
};