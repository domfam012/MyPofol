const Tooltip = props => {
  /*
   * props
   *
   * feed(str)
   * style(obj)
   *
   * */
  const { feed, style } = props;

  return (
      <div className="invalid-feedback"
           style={style}
      >
        {feed}
      </div>
  )
};

export default Tooltip;
