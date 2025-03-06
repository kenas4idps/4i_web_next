import './InlineErrorMessage.scss';

interface Props {
  errorMessageList: string[];
}

const InlineErrorMessage = ({ errorMessageList }: Props) => {
  return (
    <>
      {errorMessageList.length > 0 && (
        <div className="inline-error-message">
          <ul>
            {errorMessageList.map((error, key) => {
              return <li key={key}>{error}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default InlineErrorMessage;
