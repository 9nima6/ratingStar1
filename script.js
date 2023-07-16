function Star(props) {
  return /*#__PURE__*/(
    React.createElement("div", { className: `star ${props.value == 0 ? 'semi-active' : ''} ${props.position <= props.rated ? 'active' : ''} `,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      onClick: props.onClick }, /*#__PURE__*/


    React.createElement("i", { className: "fas fa-star" })));


}

function Rating(props) {
  const messages = {
    "1": "Oh. Sorry you had a bad experience :( ",
    "2": "We will try to improve.",
    "3": "Appreciate it!",
    "4": "Thank you!",
    "5": "You're Awesome!" };


  let rating = props.rating;

  return /*#__PURE__*/(
    React.createElement("div", { className: "after-rating-message " + (rating > 0 ? 'show' : '') }, /*#__PURE__*/
    React.createElement("span", null, "You rated this ", rating, " star", rating > 1 ? 's' : ''), /*#__PURE__*/
    React.createElement("br", null), /*#__PURE__*/
    React.createElement("span", null, messages[rating])));


}


class RatingWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: Array(5).fill(-1),
      rated: 0 };

  }

  handleMouseOver(i) {
    let currentRating = this.state.rated;

    if (currentRating > 0) {
      const hoverRatedStars = this.state.stars.slice();
      _.fill(hoverRatedStars, 0, currentRating, i);
      this.setState({ stars: hoverRatedStars });
    } else
    {
      const hoverStars = Array(5).fill(-1);
      _.fill(hoverStars, 0, 0, i + 1);
      this.setState({ stars: hoverStars });
    }
  }

  handleMouseOut() {
    let currentRating = this.state.rated;
    if (currentRating > 0) {
      const resetRatedStars = this.state.stars.slice();
      _.fill(resetRatedStars, -1, currentRating, resetRatedStars.length);
      this.setState({ stars: resetRatedStars });
    } else
    {
      const resetStars = this.state.stars.slice();
      _.fill(resetStars, -1, 0, resetStars.length);
      this.setState({ stars: resetStars });
    }
  }

  handleClick(i) {
    const clickedStar = this.state.stars.slice();

    _.fill(clickedStar, 1, 0, i);
    _.fill(clickedStar, 1, i, clickedStar.length);

    this.setState({
      stars: clickedStar,
      rated: i });

  }


  handleRating(rating) {
    return /*#__PURE__*/React.createElement(Rating, { rating: this.state.rated });
  }

  renderStar(i) {
    return /*#__PURE__*/(
      React.createElement(Star, {
        position: i,
        value: this.state.stars[i],
        rated: this.state.rated,
        onMouseEnter: () => this.handleMouseOver(i),
        onMouseLeave: () => this.handleMouseOut(),
        onClick: () => this.handleClick(i) }));


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "rating-stars-widget-outer" }, /*#__PURE__*/
      React.createElement("div", { className: "rating-stars" },
      this.renderStar(1),
      this.renderStar(2),
      this.renderStar(3),
      this.renderStar(4),
      this.renderStar(5)),


      this.handleRating(this.state.rated)));




  }}



ReactDOM.render( /*#__PURE__*/React.createElement(RatingWidget, null), document.getElementById("widget"));