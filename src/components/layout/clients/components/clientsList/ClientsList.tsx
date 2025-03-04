import { ClientFE } from '../../SharedType';

import './ClientsList.scss';

interface Props {
  clients: ClientFE[];
  canLoadMore?: boolean;
}

const ClientsList = ({ clients, canLoadMore = false }: Props) => {
  return (
    <div className="clients-list">
      <div className="content">
        {clients?.map((client, key) => {
          return (
            <div className="client-container" key={key}>
              <div
                className="client-bg"
                style={{ backgroundImage: `url(${client?.logo?.url})` }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsList;
