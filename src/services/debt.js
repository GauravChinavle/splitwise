const debt = (membersData) => {
    const result = [];
    let o = 0;
    const getMoney = [];
    const giveMoney = [];
    while (o < membersData.length) {
        if (membersData[o].owes > 0) {
            getMoney.push({ ...membersData[o], name: membersData[o].name });
        }
        if (membersData[o].needToPay > 0) {
            giveMoney.push({ ...membersData[o], name: membersData[o].name });
        }
        o++;
    }

    for (let i = 0; i < getMoney.length; i++) {
        for (let j = 0; j < giveMoney.length; j++) {
            const getMoneyIndex = membersData.findIndex(
                (m) => m.name == getMoney[i].name
            );
            const giveMoneyIndex = membersData.findIndex(
                (m) => m.name == giveMoney[j].name
            );
            if (
                membersData[getMoneyIndex].owes > membersData[giveMoneyIndex].needToPay
            ) {
                result.push(
                    `${giveMoney[j].name} owes ${Math.round(
                        membersData[giveMoneyIndex].needToPay
                    )} to ${getMoney[i].name}`
                );
                membersData[getMoneyIndex].owes -=
                    membersData[giveMoneyIndex].needToPay;
                membersData[giveMoneyIndex].needToPay = 0;
                continue;
            }
            if (
                membersData[getMoneyIndex].owes < membersData[giveMoneyIndex].needToPay
            ) {
                result.push(
                    `${giveMoney[j].name} owes ${Math.round(
                        membersData[getMoneyIndex].owes
                    )} to ${getMoney[i].name}`
                );
                membersData[giveMoneyIndex].needToPay -=
                    membersData[getMoneyIndex].owes;
                membersData[getMoneyIndex].owes = 0;
                break;
            }
            if (
                membersData[getMoneyIndex].owes == membersData[giveMoneyIndex].needToPay
            ) {
                result.push(
                    `${giveMoney[j].name} owes ${Math.round(
                        membersData[getMoneyIndex].owes
                    )} to ${getMoney[i].name}`
                );

                membersData[getMoneyIndex].owes = 0;
                membersData[giveMoneyIndex].needToPay = 0;
            }
        }
    }
    return result;
};

export default debt;
