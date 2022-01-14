var dealerCards = [],
    playerCards = [];
(dealerCards.count = 0), (playerCards.count = 0);
var bet,
    betInput,
    money,
    moneyDisplay,
    message,
    standButton,
    hitButton,
    newGameButton,
    deck = new Deck(),
    gameInProgress = !1;
function setup() {
    for (var e = 1; e <= 5; e++)
        (dealerCards[e] = new DisplayedCard("dealer" + e)), (dealerCards[e].cardContainer.style.display = "none"), (playerCards[e] = new DisplayedCard("player" + e)), (playerCards[e].cardContainer.style.display = "none");
    (message = document.getElementById("message")),
        (standButton = document.getElementById("standButton")),
        (hitButton = document.getElementById("hitButton")),
        (newGameButton = document.getElementById("newGameButton")),
        (moneyDisplay = document.getElementById("money")),
        (money = 100),
        (moneyDisplay.innerHTML = "$" + money),
        ((betInput = document.getElementById("bet")).value = 10),
        (betInput.disabled = !1),
        (standButton.disabled = !0),
        (hitButton.disabled = !0),
        (newGameButton.disabled = !1);
}
function dealCard(e, a, n) {
    var t = deck.nextCard();
    e.count++, n ? e[e.count].setFaceDown() : e[e.count].setFaceUp(), e[e.count].setCard(t), new Effect.SlideDown(e[e.count].cardContainer, { duration: 0.5, queue: "end", afterFinish: a });
}
function getTotal(e) {
    for (var a = 0, n = !1, t = 1; t <= e.count; t++) (a += Math.min(10, e[t].card.value)), 1 == e[t].card.value && (n = !0);
    return a + 10 <= 21 && n && (a += 10), a;
}
function startGame() {
    if (!gameInProgress) {
        var e = betInput.value;
        if (!e.match(/^[0-9]+$/) || e < 1 || e > money) return (message.innerHTML = "Bet must be a number between 1 and " + money + ".<br>Fix this problem and press New Game again."), void new Effect.Shake("betdiv");
        (betInput.disabled = !0), (bet = Number(e));
        for (var a = 1; a <= 5; a++) (playerCards[a].cardContainer.style.display = "none"), playerCards[a].setFaceDown(), (dealerCards[a].cardContainer.style.display = "none"), dealerCards[a].setFaceDown();
        (message.innerHTML = "Dealing Cards"),
            deck.shuffle(),
            (dealerCards.count = 0),
            (playerCards.count = 0),
            dealCard(playerCards),
            dealCard(dealerCards),
            dealCard(playerCards),
            dealCard(
                dealerCards,
                function () {
                    (standButton.disabled = !1), (hitButton.disabled = !1), (newGameButton.disabled = !0), (gameInProgress = !0);
                    var e = getTotal(dealerCards),
                        a = getTotal(playerCards);
                    21 == e ? endGame(!1, 21 == a ? "You both have Blackjack, but dealer wins on ties." : "Dealer has Blackjack.") : 21 == a ? endGame(!0, "You have Blackjack.") : (message.innerHTML = "You have " + a + ".  Hit or Stand?");
                },
                !0
            );
    }
}
function endGame(e, a) {
    e ? (money += bet) : (money -= bet),
        (message.innerHTML = (e ? "Congratulations! You win.  " : "Sorry! You lose.  ") + a + (money > 0 ? "<br>Click New Game to play again." : "<br>Looks like you've run out of money!")),
        (standButton.disabled = !0),
        (hitButton.disabled = !0),
        (newGameButton.disabled = !0),
        (gameInProgress = !1),
        dealerCards[2].faceDown && ((dealerCards[2].cardContainer.style.display = "none"), dealerCards[2].setFaceUp(), new Effect.SlideDown(dealerCards[2].cardContainer, { duration: 0.5, queue: "end" })),
        new Effect.Fade(moneyDisplay, {
            duration: 0.5,
            queue: "end",
            afterFinish: function () {
                (moneyDisplay.innerHTML = "$" + money),
                    new Effect.Appear(moneyDisplay, {
                        duration: 0.5,
                        queue: "end",
                        afterFinish: function () {
                            money <= 0
                                ? ((betInput.value = "0"), new Effect.Shake(moneyDisplay))
                                : (bet > money && (betInput.value = money), (standButton.disabled = !0), (hitButton.disabled = !0), (newGameButton.disabled = !1), (betInput.disabled = !1));
                        },
                    });
            },
        });
}
function dealersTurnAndEndGame() {
    (message.innerHTML = "Dealer's turn..."), (dealerCards[2].cardContainer.style.display = "none"), dealerCards[2].setFaceUp();
    var e = function () {
        new Effect.SlideDown(dealerCards[dealerCards.count].cardContainer, {
            duration: 0.5,
            queue: "end",
            afterFinish: function () {
                var a = getTotal(dealerCards);
                if (dealerCards.count < 5 && a <= 16) dealerCards.count++, dealerCards[dealerCards.count].setCard(deck.nextCard()), dealerCards[dealerCards.count].setFaceUp(), e();
                else if (a > 21) endGame(!0, "Dealer has gone over 21.");
                else if (5 == dealerCards.count) endGame(!1, "Dealer took 5 cards without going over 21.");
                else {
                    var n = getTotal(playerCards);
                    n > a ? endGame(!0, "You have " + n + ". Dealer has " + a + ".") : endGame(!1, n < a ? "You have " + n + ". Dealer has " + a + "." : "You and the dealer are tied at " + n + ".");
                }
            },
        });
    };
    e();
}
function hit() {
    gameInProgress &&
        ((standButton.disabled = !0),
        (hitButton.disabled = !0),
        dealCard(playerCards, function () {
            var e = getTotal(playerCards);
            e > 21
                ? endGame(!1, "YOU WENT OVER 21!")
                : 5 == playerCards.count
                ? endGame(!0, "You took 5 cards without going over 21.")
                : 21 == e
                ? dealersTurnAndEndGame()
                : ((message.innerHTML = "You have " + e + ". Hit or Stand?"), (hitButton.disabled = !1), (standButton.disabled = !1));
        }));
}
function stand() {
    gameInProgress && ((hitButton.disabled = !0), (standButton.disabled = !0), dealersTurnAndEndGame());
}
onload = setup;
