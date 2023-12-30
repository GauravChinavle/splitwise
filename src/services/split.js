const split = (expensesData, membersData) => {
    expensesData.map((e) => {
        const paidByIndex = membersData.findIndex((m) => m.name === e.paidBy);
        const share = e.amount / (e.splitWith.length + 1);
        membersData[paidByIndex].paid += e.amount;
        membersData[paidByIndex].needToPay -= share * e.splitWith.length;
        if (membersData[paidByIndex].needToPay < 0) {
            membersData[paidByIndex].owes -= membersData[paidByIndex].needToPay;
            membersData[paidByIndex].needToPay = 0;
        }
        e.splitWith.map((sp) => {
            const paidByIndex = membersData.findIndex((e) => e.name === sp);
            membersData[paidByIndex].owes -= share;
            if (membersData[paidByIndex].owes < 0) {
                membersData[paidByIndex].needToPay -= membersData[paidByIndex].owes;
                membersData[paidByIndex].owes = 0;
            }
        });
    });
    return membersData;
};

export default split;
