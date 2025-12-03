const ModalOverlay = ({ children, onClose, minWidth = null }) => (
    <div className="modalOverlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()} style={{ minWidth: minWidth && minWidth}}>
            {children}
        </div>
    </div>
);
export default ModalOverlay;