/*
    Loot Generator

    Arguments Expected:
    args[0] = Looting area size
    args[1] = Loot rarity
    args[2] = Looting area type
    args[3] = Loot divider (1 = Area has not been searched, 2 = Area has been searched but not fully, and 3 = Area is almost picked clean.)
    args[4] = Luck Ind (0 = Luck point was not used / 1 = Luck point was used.)
*/

//Argument Validation
if(!args[0] || !args[1] || !args[2] || !args[3]) {
    ui.notifications.error("This macro depends on arguments (/amacro 'Macro Name' size rarity type divider luck), which could not be found.");
    return;
}

if(args[0] != "Tiny" && args[0] != "Small" && args[0] != "Average" && args[0] != "Large") {
    ui.notifications.error("Argument 1 must be Tiny, Small, Average, or Large");
    return;
}

if(args[1] != "Common" && args[1] != "Uncommon" && args[1] != "Rare" && args[1] != "Epic" && args[1] != "Legendary" && args[1] != "Mythic") {
    ui.notifications.error("Argument 2 must be Common, Uncommon, Rare, Epic, Legendary, or Mythic");
    return;
}

if(args[2] != "Residential" && args[2] != "Commercial" && args[2] != "Industrial" && args[2] != "Medical" && args[2] != "Military/Police" && args[2] != "Hideout" && args[2] != "Mutant" && args[2] != "Vault" && args[2] != "Public") {
    ui.notifications.error("Argument 3 must be Residential, Commercial, Industrial, Medical, Military/Police, Hideout, Mutant, Vault, or Public");
    return;
}

if(args[3] > 3 || args[3] < 1) {
    ui.notifications.error("Argument 4 must be 1 - 3");
    return;
}

if(args[4] > 1 || args[4] < 0) {
    ui.notifications.error("Argument 4 must be 0 or 1");
    return;
}

//For average and large areas, it will take a while to loot. 30% Chance to roll the looting encounters table before looting.
if(args[0] == "Average" || args[0] == "Large") {
    let enc_chance = getRandomInt(99)
    if(enc_chance < 30) {
        let table = game.tables.getName("Looting Encounters")
        let draws = await table.draw({ displayChat: false })

        let msg = `
            <div class="table-draw" data-table-id="pc1orp6OEB5Wea8t">
                <h2>Before any looting can begin:</h2>
                <ol class="table-results">
                    <li class="table-result flexrow">
                        <div class="result-text">${draws.results[0].text}</div>
                    </li>
                </ol>
            </div>
        `
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({token: actor}),
            content: msg
        })
        return;
    }
}

//These will hold the amount of each type that will be drawn.
let amm = 0
let armor = 0
let cloth = 0
let food = 0
let bev = 0
let chems = 0
let melee = 0
let ranged = 0
let explo = 0
let odd = 0
let junk = 0

//Populate loot types by looting area type and size.
if(args[2] == "Residential") {
    console.log("In Residential")
    amm = getRandomInt(1)
    chems = getRandomInt(1)
    ranged = getRandomInt(1)
    odd = getRandomInt(1)
    junk = getRandomInt(2)

    if(args[0] != "Tiny") {
        cloth = cloth + 1 + getRandomInt(1)
        food = food + 1 + getRandomInt(2)
        bev = bev + getRandomInt(2)
        if(odd != 0) {odd = odd - 1}
        junk = junk + 1 + getRandomInt(1)
        if(args[0] != "Small") {
            food = food + 1
            bev = bev + getRandomInt(1)
            junk = junk + 1 + getRandomInt(1)
            if(args[0] != "Average") {
                amm = amm + getRandomInt(2)
                armor = armor + getRandomInt(1)
                cloth = cloth + 1 + getRandomInt(1)
                food = food + 1 + getRandomInt(1)
                bev = bev + 1
                chems = chems + getRandomInt(1)
                melee = melee + getRandomInt(1)
                ranged = ranged + getRandomInt(1)
                explo = explo + getRandomInt(1)
                odd = odd + 1 + getRandomInt(1)
                junk = junk + 2 + getRandomInt(1)
            }
        }
    }
} else if(args[2] == "Commercial") {
    console.log("In Commercial")
    food = getRandomInt(1)
    bev = getRandomInt(1)
    ranged = getRandomInt(1)
    odd = 1 + getRandomInt(1)
    junk = 1 + getRandomInt(1)

    if(args[0] != "Tiny") {
        amm = amm + getRandomInt(1)
        cloth = cloth + getRandomInt(2)
        food = food + getRandomInt(1)
        bev = bev + 1
        chems = chems + getRandomInt(1)
        odd = odd + getRandomInt(2)
        junk = junk + 1 + getRandomInt(1)
        if(args[0] != "Small") {
            cloth = cloth + 1
            melee = melee + getRandomInt(1)
            ranged = ranged + getRandomInt(1)
            explo = explo + getRandomInt(1)
            odd = odd + 1
            junk = junk + 1 + getRandomInt(1)
            if(args[0] != "Average") {
                amm = amm + getRandomInt(2)
                armor = armor + getRandomInt(1)
                cloth = cloth + getRandomInt(2)
                food = food + getRandomInt(2)
                bev = bev + 1 + getRandomInt(1)
                chems = chems + getRandomInt(1)
                melee = melee + getRandomInt(1)
                ranged = ranged + 1 + getRandomInt(1)
                explo = explo + getRandomInt(1)
                odd = odd + 1 + getRandomInt(1)
                junk = junk + 2 + getRandomInt(1)
            }
        }
    }
} else if(args[2] == "Industrial") {
    console.log("In Industrial")
    food = getRandomInt(1)
    bev = getRandomInt(1)
    melee = getRandomInt(1)
    explo = getRandomInt(1)
    odd = getRandomInt(1)
    junk = 1 + getRandomInt(1)

    if(args[0] != "Tiny") {
        amm = amm + getRandomInt(1)
        cloth = cloth + getRandomInt(2)
        food = food + getRandomInt(1)
        bev = bev + 1
        chems = chems + getRandomInt(1)
        melee = melee + getRandomInt(1)
        ranged = ranged + getRandomInt(1)
        odd = odd + 1
        junk = junk + 1 + getRandomInt(1)
        if(args[0] != "Small") {
            cloth = cloth + 1
            melee = melee + 2
            explo = explo + 1
            odd = odd + getRandomInt(2)
            junk = junk + 2
            if(args[0] != "Average") {
                amm = amm + getRandomInt(2)
                armor = armor + getRandomInt(1)
                cloth = cloth + getRandomInt(2)
                food = food + 1
                bev = bev + 1 + getRandomInt(1)
                chems = chems + getRandomInt(1)
                melee = melee + 1 + getRandomInt(1)
                ranged = ranged + getRandomInt(1)
                explo = explo + getRandomInt(1)
                odd = odd + 1
                junk = junk + 2 + getRandomInt(1)
            }
        }
    }
} else if(args[2] == "Medical") {
    console.log("In Medical")
    food = getRandomInt(1)
    bev = getRandomInt(1)
    chems = 1 + getRandomInt(1)
    odd = getRandomInt(1)
    junk = getRandomInt(1)

    if(args[0] != "Tiny") {
        cloth = cloth + 1 + getRandomInt(1)
        food = food + getRandomInt(1)
        bev = bev + 1
        chems = chems + 1 + getRandomInt(1)
        junk = junk + 2 + getRandomInt(1)
        if(args[0] != "Small") {
            amm = amm + getRandomInt(1)
            cloth = cloth + 1 + getRandomInt(1)
            food = food + 1 + getRandomInt(1)
            chems = chems + 1 + getRandomInt(1)
            melee = melee + getRandomInt(1)
            ranged = ranged + getRandomInt(1)
            explo = explo + getRandomInt(1)
            odd = odd + 1
            junk = junk + 1 + getRandomInt(1)
            if(args[0] != "Average") {
                armor = armor + getRandomInt(1)
                cloth = cloth + 1 + getRandomInt(1)
                food = food + 1
                bev = bev + 1 + getRandomInt(1)
                chems = chems + 1 + getRandomInt(2)
                odd = odd + 1 + getRandomInt(1)
                junk = junk + 1 + getRandomInt(2)
            }
        }
    }
} else if(args[2] == "Military/Police") {
    console.log("In Military/Police")
    amm = 1 + getRandomInt(1)
    armor = getRandomInt(1)
    cloth = getRandomInt(1)
    food = getRandomInt(1)
    bev = getRandomInt(1)
    chems = getRandomInt(1)
    melee = getRandomInt(1)
    ranged = 1
    explo = 1
    odd = getRandomInt(1)
    junk = getRandomInt(2)

    if(args[0] != "Tiny") {
        amm = amm + 1 + getRandomInt(1)
        armor = armor + 1
        cloth = cloth + getRandomInt(1)
        food = food + getRandomInt(2)
        bev = bev + 1
        chems = chems + getRandomInt(1)
        melee = melee + getRandomInt(1)
        ranged = ranged + getRandomInt(1)
        explo = explo + getRandomInt(1)
        junk = junk + 1 + getRandomInt(2)
        if(args[0] != "Small") {
            amm = amm + 2
            armor = armor + 1 + getRandomInt(1)
            cloth = cloth + 1
            food = food + 1 + getRandomInt(1)
            bev = bev + getRandomInt(2)
            chems = chems + 1 + getRandomInt(1)
            melee = melee + 1 + getRandomInt(1)
            ranged = ranged + getRandomInt(2)
            explo = explo + 1 + getRandomInt(1)
            odd = odd + 1
            junk = junk + 1
            if(args[0] != "Average") {
                amm = amm + 2 + getRandomInt(1)
                armor = armor + getRandomInt(2)
                cloth = cloth + getRandomInt(2)
                food = food + 1 + getRandomInt(1)
                bev = bev + 1 + getRandomInt(1)
                chems = chems + getRandomInt(2)
                melee = melee + 1
                ranged = ranged + 1 + getRandomInt(1)
                explo = explo + 1 + getRandomInt(1)
                odd = odd + 1 + getRandomInt(1)
                junk = junk + 1 + getRandomInt(1)
            }
        }
    }
} else if(args[2] == "Hideout") {
    console.log("In Hideout")
    amm = getRandomInt(1)
    armor = getRandomInt(1)
    cloth = getRandomInt(1)
    food = getRandomInt(1)
    bev = getRandomInt(1)
    chems = getRandomInt(1)
    melee = getRandomInt(1)
    ranged = getRandomInt(1)
    explo = getRandomInt(2)
    odd = 1 + getRandomInt(1)
    junk = getRandomInt(1)

    if(args[0] != "Tiny") {
        amm = amm + 1
        armor = armor + 1
        cloth = cloth + getRandomInt(1)
        food = food + 1
        bev = bev + 1
        chems = chems + getRandomInt(1)
        melee = melee + 1
        ranged = ranged + 1
        junk = junk + 1
        if(args[0] != "Small") {
            amm = amm + 1 + getRandomInt(1)
            armor = armor + 1 + getRandomInt(1)
            cloth = cloth + 1
            food = food + 1 + getRandomInt(1)
            bev = bev + getRandomInt(2)
            chems = chems + 1 + getRandomInt(1)
            melee = melee + 1 + getRandomInt(1)
            ranged = ranged + getRandomInt(2)
            explo = explo + 1 + getRandomInt(1)
            odd = odd + getRandomInt(2)
            junk = junk + 1 + getRandomInt(1)
            if(args[0] != "Average") {
                amm = amm + 1 + getRandomInt(1)
                armor = armor + getRandomInt(2)
                cloth = cloth + 1 + getRandomInt(1)
                food = food + 1 + getRandomInt(1)
                bev = bev + 1 + getRandomInt(1)
                chems = chems + 1 + getRandomInt(1)
                melee = melee + getRandomInt(2)
                ranged = ranged + 1
                explo = explo + 1 + getRandomInt(1)
                odd = odd + 1
                junk = junk + getRandomInt(2)
            }
        }
    }
} else if(args[2] == "Mutant") {
    console.log("In Mutant")
    amm = getRandomInt(1)
    armor = getRandomInt(1)
    melee = getRandomInt(1)
    ranged = getRandomInt(1)
    explo = getRandomInt(2)
    junk = 1 + getRandomInt(1)

    if(args[0] != "Tiny") {
        amm = amm + 1
        armor = armor + 1
        cloth = cloth + getRandomInt(2)
        food = food + 1 + getRandomInt(1)
        bev = bev + 1 + getRandomInt(1)
        chems = chems + getRandomInt(1)
        melee = melee + 1
        ranged = ranged + 1
        odd = odd + getRandomInt(1)
        junk = junk + 1 + getRandomInt(1)
        if(args[0] != "Small") {
            amm = amm + 1 + getRandomInt(1)
            armor = armor + 1 + getRandomInt(1)
            cloth = cloth + 1
            food = food + 1 + getRandomInt(1)
            bev = bev + getRandomInt(2)
            chems = chems + getRandomInt(1)
            melee = melee + 1 + getRandomInt(1)
            ranged = ranged + getRandomInt(2)
            explo = explo + 1 + getRandomInt(1)
            odd = odd + 1
            junk = junk + getRandomInt(2)
            if(args[0] != "Average") {
                amm = amm + 1 + getRandomInt(1)
                armor = armor + getRandomInt(2)
                cloth = cloth + 1 + getRandomInt(1)
                food = food + getRandomInt(2)
                chems = chems + 1
                melee = melee + getRandomInt(2)
                ranged = ranged + 1
                explo = explo + 1 + getRandomInt(1)
                odd = odd + getRandomInt(2)
                junk = junk + 1
            }
        }
    }
} else if(args[2] == "Vault") {
    console.log("In Vault")
    amm = 1 + getRandomInt(1)
    food = getRandomInt(1)
    bev = getRandomInt(1)
    chems = getRandomInt(1)
    melee = getRandomInt(1)
    ranged = getRandomInt(1)
    explo = getRandomInt(1)
    junk = getRandomInt(1)

    if(args[0] != "Tiny") {
        amm = amm + getRandomInt(2)
        cloth = cloth + 1 + getRandomInt(1)
        food = food + 1 + getRandomInt(1)
        bev = bev + 1
        junk = junk + getRandomInt(1)
        if(args[0] != "Small") {
            amm = amm + 1
            food = food + 1
            bev = bev + getRandomInt(1)
            melee = melee + 1
            ranged = ranged + 1
            explo = explo + 1
            junk = junk + 1
            if(args[0] != "Average") {
                amm = amm + getRandomInt(2)
                armor = armor + getRandomInt(1)
                cloth = cloth + 1 + getRandomInt(1)
                food = food + 1 + getRandomInt(1)
                bev = bev + 1
                chems = chems + 1
                melee = melee + getRandomInt(2)
                ranged = ranged + 1 + getRandomInt(1)
                explo = explo + 1 + getRandomInt(1)
                odd = odd + 1 + getRandomInt(1)
                junk = junk + 1 + getRandomInt(1)
            }
        }
    }
} else {
    console.log("In Else")
    food = getRandomInt(1)
    bev = getRandomInt(1)
    odd = 1 + getRandomInt(1)
    junk = 1 + getRandomInt(1)

    if(args[0] != "Tiny") {
        amm = amm + getRandomInt(1)
        cloth = cloth + getRandomInt(2)
        food = food + getRandomInt(2)
        bev = bev + 1
        chems = chems + getRandomInt(1)
        odd = odd + getRandomInt(2)
        junk = junk + getRandomInt(2)
        if(args[0] != "Small") {
            cloth = cloth + 1
            food = food + 1
            melee = melee + getRandomInt(1)
            ranged = ranged + getRandomInt(1)
            odd = odd + 1
            junk = junk + 1 + getRandomInt(1)
            if(args[0] != "Average") {
                amm = amm + getRandomInt(2)
                armor = armor + getRandomInt(1)
                cloth = cloth + getRandomInt(2)
                food = food + getRandomInt(2)
                bev = bev + 1 + getRandomInt(1)
                chems = chems + getRandomInt(1)
                melee = melee + getRandomInt(1)
                ranged = ranged + getRandomInt(1)
                explo = explo + getRandomInt(1)
                odd = odd + 1 + getRandomInt(1)
                junk = junk + 2 + getRandomInt(1)
            }
        }
    }
}

//Dividing the total ammount of each loot by the loot divisor.
amm = lootDivisor(amm)
armor = lootDivisor(armor)
cloth = lootDivisor(cloth)
food = lootDivisor(food)
bev = lootDivisor(bev)
chems = lootDivisor(chems)
melee = lootDivisor(melee)
ranged = lootDivisor(ranged)
explo = lootDivisor(explo)
odd = lootDivisor(odd)
junk = lootDivisor(junk)

//These tables do not exist due to no items with that rarity. None will be looted.
if(args[1] == "Common") {
    chems = 0
    explo = 0
} else if(args[1] == "Epic") {
    junk = 0
} else if(args[1] == "Legendary" || args[1] == "Mythic") {
    cloth = 0
    junk = 0
}

//Header for the table and declaring the start of the chat message.
let msg = `
    <div class="table-draw" data-table-id="pc1orp6OEB5Wea8t">
        <div>You loot the ${args[1]} ${args[0]} ${args[2]} area to find:</div>
        <ol class="table-results">
`

//For each loot type, if it is not zero, call rollAndAddItem to roll necessary tables and populate the chat msg.
if(amm != 0) {await rollAndAddItem((args[1] + " Ammo"), amm, "Ammo:")}
if(armor != 0) {await rollAndAddItem((args[1] + " Armor"), armor, "Armor:")}
if(cloth != 0) {await rollAndAddItem((args[1] + " Clothing"), cloth, "Clothing:")}
if(food != 0) {await rollAndAddItem((args[1] + " Food"), food, "Food:")}
if(bev != 0) {await rollAndAddItem((args[1] + " Beverages"), bev, "Beverages:")}
if(chems != 0) {await rollAndAddItem((args[1] + " Chems"), chems, "Chems:")}
if(melee != 0) {await rollAndAddItem((args[1] + " Melee Weapons"), melee, "Melee Weapons:")}
if(ranged != 0) {await rollAndAddItem((args[1] + " Ranged Weapons"), ranged, "Ranged Weapons:")}
if(explo != 0) {await rollAndAddItem((args[1] + " Explosives/Thrown"), explo, "Explosives/Thrown:")}
if(odd != 0) {await rollAndAddItem((args[1] + " Oddities/Treasure"), odd, "Oddities/Treasure:")}
if(junk != 0) {await rollAndAddItem((args[1] + " Junk"), junk, "Junk:")}

//Other than tiny looting areas, there is a 20% chance to find a locked container.
if(args[0] != "Tiny") {
    let enc_chance = getRandomInt(99)
    if(enc_chance < 20) {
        msg += `
            <h2>You find a locked container! Attempt a lockpicking test to get inside.</h2>
        `
    }
}

//Close the msg.
msg += `
        </ol>
    </div>
`

//Generate the chat message.
ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: msg
})

//****Functions****
//Return a random int from 0 to max
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

//Divide loot total by loot divisor, multiply by 1.5 if a luck point was spent, and round to the nearest int.
function lootDivisor(loot) {
    return Math.round((loot / args[3]) * (args[4] * 1.5))
}

//Populating message by rolling all necessary tables.
async function rollAndAddItem(tableName, modifier, type){
    //These tables do not exist and instead roll the lower rarity table.
    if(tableName.includes("Melee") && (args[1] == "Legendary" || args[1] == "Mythic")) {
        tableName = "Epic Melee Weapons"
    } else if(tableName.includes("Food") && args[1] == "Mythic") {
        tableName = "Legendary Food"
    } else if(tableName.includes("Beverages") && args[1] == "Mythic") {
        tableName = "Legendary Beverages"
    } else if(tableName.includes("Chems") && args[1] == "Mythic") {
        tableName = "Legendary Chems"
    } else if(tableName.includes("Ranged") && args[1] == "Mythic") {
        tableName = "Legendary Ranged Weapons"
    } else if(tableName.includes("Explosives") && args[1] == "Mythic") {
        tableName = "Legendary Explosives/Thrown"
    }
    //Draw given table an amount of times equal to the given loot total.
    let table = game.tables.getName(tableName)
    let draws = await table.drawMany(modifier, { displayChat: false })
    console.log(draws)
    
    //Used later for multiple sub-draws like attachments and legendary effects.
    let table2
    let draws2

    //Start message section for the given type.
    msg += `
        <h2>${type}</h2>
    `
    
    //Looping through the table results
    for(i = 0; i < draws.results.length; i++) {
        //Check if the result is a text result instead of an item.
        if(draws.results[i].type == 0) {
            //Check if the textual result is a mod, then roll that mod table to see what that mod will be.
            if(draws.results[i].text == "Melee Weapon Mod") {
                if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                    table2 = game.tables.getName("Rare Melee Weapon Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Melee Weapon Mods")
                }
                draws2 = await table2.draw({ displayChat: false })
                draws.results[i] = draws2.results[0]
            } else if(draws.results[i].text == "Small Gun Mod") {
                if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                    table2 = game.tables.getName("Rare Small Gun Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Small Gun Mods")
                }
                draws2 = await table2.draw({ displayChat: false })
                draws.results[i] = draws2.results[0]
            } else if(draws.results[i].text == "Big Gun Mod") {
                if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                    table2 = game.tables.getName("Rare Big Gun Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Big Gun Mods")
                }
                draws2 = await table2.draw({ displayChat: false })
                draws.results[i] = draws2.results[0]
            } else if(draws.results[i].text == "Energy Weapon Mod") {
                if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                    table2 = game.tables.getName("Rare Energy Weapon Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Energy Weapon Mods")
                }
                draws2 = await table2.draw({ displayChat: false })
                draws.results[i] = draws2.results[0]
            } else if(draws.results[i].text == "Armor Mod") {
                if(args[1] == "Legendary" || args[1] == "Mythic") {
                    table2 = game.tables.getName("Epic Armor Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Armor Mods")
                }
                draws2 = await table2.draw({ displayChat: false })
                draws.results[i] = draws2.results[0]
            } else if(draws.results[i].text == "Clothing Mod") {
                if(args[1] == "Epic") {
                    table2 = game.tables.getName("Rare Clothing Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Clothing Mods")
                }
                draws2 = await table2.draw({ displayChat: false })
                draws.results[i] = draws2.results[0]
            }
            console.log(draws.results[i])
        }

        //Cleaning up item names so they are not too long and mess up formatting.
        let item_sz = draws.results[i].text.length
        let item_txt = draws.results[i].text
        if(item_sz > 26) {
            item_sz = item_sz - 26
            item_txt = item_txt.slice(0, -item_sz) + "..."
        }

        //Populate the message with what was rolled.
        if(draws.results[i].text == "Publication" || draws.results[i].text == "Nuka Machine" || draws.results[i].text == "Unknown Key") {
            msg += `
                <li class="table-result flexrow">
                    <div class="result-text">1 x ${item_txt}</div>
                </li>
            `
        } else{
            msg += `
                <li class="table-result flexrow">
                    <img class="result-image" src=${draws.results[i].img} />
                    <div class="result-text">${(await new Roll(draws.results[i].flags["better-rolltables"]["brt-result-formula"].formula).evaluate({async:true})).total} x @Item[${draws.results[i].documentId}]{${item_txt}}</div>
                </li>
            `
        }

        //Melee attachements are rolled and generated on a 30% chance if the result is a melee weapon.
        if(tableName.includes("Melee") && !draws.results[i].text.includes("Mod")) {
            let mod_chance = getRandomInt(99)
            //Luck point allows for a 40% chance of attachments.
            if(args[4] == 1) {mod_chance = mod_chance - 10}
            if(mod_chance < 30) {
                //Number of attachments found.
                let mod_num = getRandomInt(99)
                //These location types have a better chance for more attachments.
                if(args[2] == "Industrial" || args[2] == "Hideout" || args[2] == "Mutant" || args[4] == 1) {
                    mod_num = mod_num + 30
                }
                mod_num = Math.round(mod_num / 30)
                if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                    table2 = game.tables.getName("Rare Melee Weapon Mods")
                } else {
                    table2 = game.tables.getName(args[1] + " Melee Weapon Mods")
                }
                draws2 = await table2.drawMany(mod_num, { displayChat: false })
                for(j = 0; j < draws2.results.length; j++) {
                    //Cleaning up item names so they are not too long and mess up formatting.
                    item_sz = draws2.results[j].text.length
                    item_txt = draws2.results[j].text
                    if(item_sz > 26) {
                        item_sz = item_sz - 26
                        item_txt = item_txt.slice(0, -item_sz) + "..."
                    }
                    msg += `
                        <div>
                            <h4>Attachment ${j + 1}</h4>
                            <li class="table-result flexrow">
                                <img class="result-image" src=${draws2.results[j].img} />
                                <div class="result-text">1 x @Item[${draws2.results[j].documentId}]{${item_txt}}</div>
                            </li>
                            <br></br>
                        </div>
                    `
                }
            }
            //5% chance to get a legendary effect on a weapon.
            mod_chance = getRandomInt(99)
            //15% chance if a luck point was used to loot.
            if(args[4] == 1) {mod_chance = mod_chance - 10}
            if(mod_chance < 5) {
                table2 = game.tables.getName("Melee Weapon Legendary Status")
                draws2 = await table2.draw({ displayChat: false })
                msg += `
                    <div>
                        <h3>LEGENDARY!</h3>
                        <li class="table-result flexrow">
                            <img class="result-image" src="https://assets.forge-vtt.com/63224349fb97ecfcfcde836b/fo4_star.png"/>
                            <div class="result-text">${draws2.results[0].text}</div>
                        </li>
                        <br></br>
                    </div>
                `
            }
        }

        //Ranged attachements are rolled and generated on a 30% chance if the result is a ranged weapon.
        if(tableName.includes("Ranged") && !draws.results[i].text.includes("Mod")) {
            let mod_chance = getRandomInt(99)
            if(args[4] == 1) {mod_chance = mod_chance - 10}
            if(mod_chance < 30) {
                let mod_num = getRandomInt(99)
                if(args[2] == "Military/Police" || args[2] == "Hideout" || args[2] == "Mutant" || args[4] == 1) {
                    mod_num = mod_num + 30
                }
                mod_num = Math.round(mod_num / 30)
                if(ItemDirectory.collection.get(draws.results[i].documentId).system.weaponType == "smallGuns") {
                    if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                        table2 = game.tables.getName("Rare Small Gun Mods")
                    } else {
                        table2 = game.tables.getName(args[1] + " Small Gun Mods")
                    }
                    draws2 = await table2.drawMany(mod_num, { displayChat: false })
                    for(j = 0; j < draws2.results.length; j++) {
                        item_sz = draws2.results[j].text.length
                        item_txt = draws2.results[j].text
                        if(item_sz > 26) {
                            item_sz = item_sz - 26
                            item_txt = item_txt.slice(0, -item_sz) + "..."
                        }
                        msg += `
                            <div>
                                <h4>Attachment ${j + 1}</h4>
                                <li class="table-result flexrow">
                                    <img class="result-image" src=${draws2.results[j].img} />
                                    <div class="result-text">1 x @Item[${draws2.results[j].documentId}]{${item_txt}}</div>
                                </li>
                                <br></br>
                            </div>
                        `
                    }
                }
                if(ItemDirectory.collection.get(draws.results[i].documentId).system.weaponType == "bigGuns") {
                    if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                        table2 = game.tables.getName("Rare Big Gun Mods")
                    } else {
                        table2 = game.tables.getName(args[1] + " Big Gun Mods")
                    }
                    draws2 = await table2.drawMany(mod_num, { displayChat: false })
                    for(j = 0; j < draws2.results.length; j++) {
                        item_sz = draws2.results[j].text.length
                        item_txt = draws2.results[j].text
                        if(item_sz > 26) {
                            item_sz = item_sz - 26
                            item_txt = item_txt.slice(0, -item_sz) + "..."
                        }
                        msg += `
                            <div>
                            <h4>Attachment ${j + 1}</h4>
                                <li class="table-result flexrow">
                                    <img class="result-image" src=${draws2.results[j].img} />
                                    <div class="result-text">1 x @Item[${draws2.results[j].documentId}]{${item_txt}}</div>
                                </li>
                                <br></br>
                            </div>
                        `
                    }
                }
                if(ItemDirectory.collection.get(draws.results[i].documentId).system.weaponType == "energyWeapons") {
                    if(args[1] == "Epic" || args[1] == "Legendary" || args[1] == "Mythic") {
                        table2 = game.tables.getName("Rare Energy Weapon Mods")
                    } else {
                        table2 = game.tables.getName(args[1] + " Energy Weapon Mods")
                    }
                    draws2 = await table2.drawMany(mod_num, { displayChat: false })
                    for(j = 0; j < draws2.results.length; j++) {
                        item_sz = draws2.results[j].text.length
                        item_txt = draws2.results[j].text
                        if(item_sz > 26) {
                            item_sz = item_sz - 26
                            item_txt = item_txt.slice(0, -item_sz) + "..."
                        }
                        msg += `
                            <div>
                            <h4>Attachment ${j + 1}</h4>
                                <li class="table-result flexrow">
                                    <img class="result-image" src=${draws2.results[j].img} />
                                    <div class="result-text">1 x @Item[${draws2.results[j].documentId}]{${item_txt}}</div>
                                </li>
                                <br></br>
                            </div>
                        `
                    }
                }
            }
            mod_chance = getRandomInt(99)
            if(args[4] == 1) {mod_chance = mod_chance - 10}
            if(mod_chance < 5) {
                table2 = game.tables.getName("Ranged Weapon Legendary Status")
                draws2 = await table2.draw({ displayChat: false })
                msg += `
                    <div>
                        <h3>LEGENDARY!</h3>
                        <li class="table-result flexrow">
                            <img class="result-image" src="https://assets.forge-vtt.com/63224349fb97ecfcfcde836b/fo4_star.png"/>
                            <div class="result-text">${draws2.results[0].text}</div>
                        </li>
                        <br></br>
                    </div>
                `
            }
        }
        
        //Armor only has a 5% chance of legendary status and no chance of attachments for now.
        if(tableName.includes("Armor") && !draws.results[i].text.includes("Mod")) {
            let mod_chance = getRandomInt(99)
            if(args[4] == 1) {mod_chance = mod_chance - 10}
            if(mod_chance < 5) {
                table2 = game.tables.getName("Armor Legendary Status")
                draws2 = await table2.draw({ displayChat: false })
                msg += `
                    <div>
                        <h3>LEGENDARY!</h3>
                        <li class="table-result flexrow">
                            <img class="result-image" src="https://assets.forge-vtt.com/63224349fb97ecfcfcde836b/fo4_star.png"/>
                            <div class="result-text">${draws2.results[0].text}</div>
                        </li>
                        <br></br>
                    </div>
                `
            }
        }
    }
    //New line in between sections
    msg += `
        <br></br>
    `
}