import StationCard from "./StationCard.jsx";
import StationFormModal from "./StationFormModal.jsx";
import {useState} from "react";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import ChargerFormModal from "./ChargerFormModal.jsx";

const StationList = ({ stations }) => {
    const [editingStation, setEditingStation] = useState(null);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [chargerModalOpen, setChargerModalOpen] = useState(false);
    const [currentCharger, setCurrentCharger] = useState(null);
    const [currentStation, setCurrentStation] = useState(null);

    const handleEditClick = (station) => {
        setEditingStation(station);
        setEditModalOpen(true);
    };

    const handleEditSubmit = (values) => {
        console.log("Station update:", values);
        setEditModalOpen(false);
        setEditingStation(null);
    };

    const handleDeleteClick = (station) => {
        setEditingStation(station);
        setDeleteConfirmModalOpen(true);
    };

    const handleDeleteConfirm = (station) => {
        console.log("Station delete:", station);
        setEditingStation(null);
        setDeleteConfirmModalOpen(false);
    };

    const handleAddChargerClick = (station) => {
        setCurrentStation(station);
        setCurrentCharger(null);
        setChargerModalOpen(true);
    };

    const handleEditChargerClick = (station, charger) => {
        setCurrentStation(station);
        setCurrentCharger(charger);
        setChargerModalOpen(true);
    };

    const handleDeleteChargerClick = (station, charger) => {
        setCurrentStation(station);
        setCurrentCharger(charger);
        setDeleteConfirmModalOpen(true);
    };

    const handleChargerSubmit = (values) => {
        console.log("Charger update:", {station: currentStation, charger: values});
        setChargerModalOpen(false);
    };

    const handleDeleteChargerConfirm = () => {
        setDeleteConfirmModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            {stations.map((station) => (
                <StationCard
                    key={station.id}
                    station={station}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    onAddChargerClick={() => handleAddChargerClick(station)}
                    onEditChargerClick={handleEditChargerClick}
                    onDeleteChargerClick={handleDeleteChargerClick}
                />
            ))}

            {/* Edit Modal */}
            <StationFormModal
                open={editModalOpen}
                mode="edit"
                initialValues={editingStation || {}}
                onCancel={() => { setEditingStation(null); setEditModalOpen(false) }}
                onSubmit={handleEditSubmit}
            />

            {/* Charger Form Modal */}
            <ChargerFormModal
                open={chargerModalOpen}
                onCancel={() => setChargerModalOpen(false)}
                onSubmit={handleChargerSubmit}
                mode={currentCharger ? "edit" : "add"}
                initialValues={currentCharger || {}}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                open={deleteConfirmModalOpen}
                onCancel={() => {
                    setCurrentStation(null);
                    setCurrentCharger(null);
                    setDeleteConfirmModalOpen(false);
                }}
                onConfirm={currentCharger ? handleDeleteChargerConfirm : handleDeleteConfirm}
                title={currentCharger ? "Xác nhận xóa cổng sạc" : "Xác nhận xóa trạm sạc"}
                message={
                    currentCharger
                        ? `Bạn có chắc chắn muốn xóa cổng sạc ${currentCharger.name}?`
                        : `Bạn có chắc chắn muốn xóa trạm sạc ${editingStation?.name}?`
                }
            />
        </div>
    );
};

export default StationList;
