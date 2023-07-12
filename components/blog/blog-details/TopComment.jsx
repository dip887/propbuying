const TopComment = ({ author }) => {
  return (
    <div className="row y-gap-30">
      <div className="col-auto">
        <img
          src={author.img}
          alt={author.name}
          className="rounded-full"
          width={80}
        />
      </div>
      <div className="col-md">
        <h3 className="text-18 fw-500">{author.name}</h3>
        <div className="text-14 text-light-1">{author.designation}</div>
        <div className="text-15 mt-10">
          {author.bio[0].children.map((b, i) => (
            <p key={i}>{b.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopComment;
