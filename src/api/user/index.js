import Api from './methods';

export const userApi = {
    getCustomerList({ page }) {
        const param = {
            page,
        };
        return Api.get('/user/list', param);
    },
    addCustomer({
        name,
        id,
        email,
        dialCode,
        countryCode,
        dob,
        international,
        significant
    }) {
        const data = {
            name,
            id,
            email,
            dialCode,
            countryCode,
            dob,
            international,
            significant
        };
        return Api.post('/add', data);
    },
    updateCustomer({
        name,
        id,
        email,
        dialCode,
        countryCode,
        dob,
        prevId,
        prevEmail,
        international,
        significant
    }) {
        const data = {
            name,
            id,
            email,
            dialCode,
            countryCode,
            dob, prevId, international, prevEmail,
            significant
        };
        return Api.post('/update', data);
    },
    deleteCustomer({
        id
    }) {
        const data = {
            id,
        };
        return Api.post('/delete', data);
    },
    getCustomerDetail({
        id
    }) {
        const data = {
            id,
        };
        return Api.get('/user', data);
    }
}