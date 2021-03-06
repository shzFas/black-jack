function DisplayedCard(t, e) {
    (this.card = e || new Card(Card.ACE, Card.SPADE)), (this.faceDown = !0), (this.div = document.getElementById(t)), (this.div.style.width = "79px"), (this.div.style.height = "123px");
    var i = document.createElement("div");
    (this.cardContainer = i), (i.style.position = "relative"), (i.style.width = "79px"), (i.style.height = "123px"), (i.style.left = "0px"), (i.style.top = "0px"), this.div.appendChild(i);
    var s = document.createElement("img");
    (this.cardImg = s), (s.src = "cards.png"), (s.style.position = "absolute"), (s.style.width = "1027px"), (s.style.height = "615px"), this.setPositionAndClip(), i.appendChild(s);
}
(DisplayedCard.prototype.setPositionAndClip = function () {
    var t, e;
    this.faceDown ? ((t = 158), (e = 492)) : ((t = 79 * (this.card.value - 1)), (e = 123 * (this.card.suit - 1))),
        (this.cardImg.style.left = "-" + t + "px"),
        (this.cardImg.style.top = "-" + e + "px"),
        (this.cardImg.style.clip = "rect(" + e + "px " + (t + 79) + "px " + (e + 123) + "px " + t + "px)");
}),
    (DisplayedCard.prototype.setCard = function (t) {
        (this.card = t), this.setPositionAndClip();
    }),
    (DisplayedCard.prototype.setFaceDown = function () {
        0 == arguments.length ? (this.faceDown = !0) : (this.faceDown = Boolean(arguments[0])), this.setPositionAndClip();
    }),
    (DisplayedCard.prototype.setFaceUp = function () {
        0 == arguments.length ? (this.faceDown = !1) : (this.faceDown = !Boolean(arguments[0])), this.setPositionAndClip();
    });
