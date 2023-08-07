module.exports = {
    LEAD_CREATED_NOTIFICATION: async (payload) => {
        console.log('payload', payload)
        const title = `Lead Created : ${payload?.leadId}`;

        const description = `New Lead order ${payload?.leadId} has been created successfully.`
        return [title, description];
    },
    AP_CREATED_NOTIFICATION: async (payload) => {
        console.log('payload', payload)
        const title = `AP Created : ${payload?.authorizedPersonId}`;

        const description = `New AP  ${payload?.authorizedPersonId} has been created successfully.`
        return [title, description];
    },       
};