const ModalOverlay = ({ children, onClose }) => (
    <div className="modalOverlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
);
export default ModalOverlay;