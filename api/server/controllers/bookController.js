import dbQuery from '../database/dbQuery';

import { errorMsg, successMsg, status } from '../helpers/status';

const getAllBooks = async (req, res) => {
    const sql = `SELECT b.*, CONCAT(a.firstname, ' ', a.lastname) author
                 FROM books b JOIN authors a on b.authorid = a.id ORDER BY b.id ASC`;
    try {
        const { rows } = await dbQuery.query(sql);
        const dbResponse = rows;

        if (dbResponse[0] == undefined) {
            errorMsg.error = ('There is no stored book in the system');
            return res.status(status.notfound).send(errorMsg);
        }
        successMsg.data = dbResponse;
        return res.status(status.success).send(successMsg);
    } catch (error) {
        errorMsg.error = 'An error occurred while getting data';
        return res.status(status.error).send(errorMsg);
    }
}

export {
    getAllBooks
}