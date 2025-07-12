import { useActions } from "../hooks/useActions";
import { Link } from "react-router-dom";

export const ContactCard = ({ props }) => {
  const { deleteContact } = useActions();

  return (
    <>
      <div className="container border border-1 bg-light my-2 rounded-4">
        <div className="row" style={{ height: "12rem" }}>
          <div className="col-3 d-flex align-items-center justify-content-center">
            <img
              src="src/assets/img/beeglo.png"
              className="bg-secondary rounded-circle"
              style={{ width: "11.5rem", height: "11.5rem" }}
              alt="Contact"
            />
          </div>
          <div className="col-6 text-start d-flex flex-column justify-content-center">
            <h3 className="text-dark">{props.name}</h3>
            <div className="text-secondary">
              <div>
                <i className="fa fa-location-dot ms-2 me-1" /> {props.address}
              </div>
              <div>
                <i className="fa fa-phone ms-2 me-1" /> {props.phone}
              </div>
              <div>
                <i className="fa fa-envelope ms-2 me-1" /> {props.email}
              </div>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-center pt-5">
            <div className="px-3">
              <Link
                to={`/EditContact/${props.id}`}
                className="btn btn-link border-0 p-0 d-flex text-decoration-none"
                style={{ width: "2rem" }}
              >
                <i className="fa fa-pencil text-black ms-2 me-1" />
              </Link>
            </div>
            <div className="px-3">
              {/* Delete Button triggers Bootstrap modal */}
              <button
                className="btn btn-link border-0 p-0 d-flex text-decoration-none"
                style={{ width: "2rem" }}
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal-${props.id}`} // unique modal per contact
              >
                <i className="fa fa-trash text-black ms-2 me-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id={`deleteModal-${props.id}`} // unique ID for each modal
        tabIndex="-1"
        aria-labelledby={`deleteModalLabel-${props.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`deleteModalLabel-${props.id}`}
              >
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <strong>{props.name}</strong>'s contact information?
              <p className="text-secondary mt-2 mb-0">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal" // auto close modal
                onClick={() => deleteContact(props.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCard;