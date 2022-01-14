﻿function Card(t, e) {
    (this.suit = -1), (this.value = -1), arguments.length >= 2 && this.set(arguments[0], arguments[1]);
}
function Deck() {
    (this.deck = new Array(52)), (this.count = 52);
    for (var t = 0, e = 1; e <= 4; e++) for (var r = 1; r <= 13; r++) this.deck[t++] = new Card(r, e);
}
(Card.ACE = 1),
    (Card.JACK = 11),
    (Card.QUEEN = 12),
    (Card.KING = 13),
    (Card.CLUB = 1),
    (Card.DIAMOND = 2),
    (Card.SPADE = 4),
    (Card.HEART = 3),
    (Card.prototype.clear = function () {
        (this.suit = -1), (this.value = -1);
    }),
    (Card.prototype.set = function (t, e) {
        if (arguments.length < 2) throw "The set function requires two arguments.";
        var r = Math.round(Number(t)),
            a = Math.round(Number(e));
        if (!(r > -1 && r <= 13)) throw "The value of a card must be in the range 1 to 13.";
        if (!(a >= 1 && a <= 4)) throw "The suit of a card must be 1, 2, 3, or 4.";
        (this.suit = a), (this.value = r);
    }),
    (Card.prototype.toString = function () {
        if (-1 == this.value) return "(Card not shown)";
        var t = "";
        switch (this.value) {
            case 1:
                t += "Ace";
                break;
            case 11:
                t += "Jack";
                break;
            case 12:
                t += "Queen";
                break;
            case 13:
                t += "King";
                break;
            default:
                t += this.value;
        }
        switch (((t += " of "), this.suit)) {
            case 1:
                t += "Clubs";
                break;
            case 2:
                t += "Diamonds";
                break;
            case 3:
                t += "Hearts";
                break;
            case 4:
                t += "Spades";
        }
        return t;
    }),
    (Deck.prototype.shuffle = function () {
        for (var t = 51; t > 0; t--) {
            var e = Math.floor((t + 1) * Math.random(t)),
                r = this.deck[e];
            (this.deck[e] = this.deck[t]), (this.deck[t] = r);
        }
        this.count = 52;
    }),
    (Deck.prototype.nextCard = function () {
        if (0 == this.count) throw "Deck is out of cards";
        return this.deck[--this.count];
    });
