import './InsightPictures.scss';

interface InsightPictureType {
  url: string;
  fullScreen?: boolean;
}

interface Props {
  list: InsightPictureType[];
  parentIndex: string;
}

const InsightPictures = ({ list, parentIndex }: Props) => {
  return (
    <div key={parentIndex} className="insight-pictures">
      {list?.length > 1 ? (
        list.map((picture, i) => {
          return (
            <span
              className="picture double"
              style={{ backgroundImage: `url(${picture.url})` }}
              key={`${parentIndex}-${i}`}
            ></span>
          );
        })
      ) : (
        <span
          className={'picture full-screen'}
          style={{ backgroundImage: `url(${list[0]?.url})` }}
        ></span>
      )}
    </div>
  );
};

export default InsightPictures;
