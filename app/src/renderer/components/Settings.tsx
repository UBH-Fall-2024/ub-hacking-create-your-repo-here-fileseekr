// src/renderer/components/Settings.tsx
import React, { useState } from 'react';
import { Camera, Cloud, Trash2, Plus, FileText, Image, Film, Music, Save } from 'lucide-react';
import '../styles/settings.css';

const Settings: React.FC = () => {
    const [paths, setPaths] = useState<string[]>(['C:/Users/YourName/Documents']);
    const [fileTypes, setFileTypes] = useState({
        documents: true,
        images: true,
        videos: true,
        audio: true
    });
    const [cloudServices, setCloudServices] = useState({
        dropbox: true,
        googleDrive: false,
        oneDrive: false
    });

    const [ocrEnabled, setOcrEnabled] = useState(false);

    const handleAddPath = () => {
        setPaths([...paths, '']);
    };

    const handleRemovePath = (index: number) => {
        setPaths(paths.filter((_, i) => i !== index));
    };

    const handleBrowse = async (index: number) => {
        console.log("HEY I AM HERE")
        const selectedPath = await window.electron.openDirectoryDialog();
        if (selectedPath) {
            const newPaths = [...paths];
            newPaths[index] = selectedPath;
            setPaths(newPaths);
        }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>

            <section className="settings-section">
                <h2>OCR Settings</h2>
                <div className="ocr-section">
                    <div className="ocr-item">
                        <Camera className="ocr-icon" size={24}/>
                        <span>Enable OCR</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={ocrEnabled}
                                onChange={() => setOcrEnabled(!ocrEnabled)}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                </div>
            </section>
            <section className="settings-section">
                <h2>Cloud Services</h2>
                <div className="cloud-services">
                    <div className="service-item">
                        <Cloud className="service-icon dropbox"/>
                        <span>Dropbox</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={cloudServices.dropbox}
                                onChange={() => setCloudServices({...cloudServices, dropbox: !cloudServices.dropbox})}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                    <div className="service-item">
                        <Cloud className="service-icon google-drive"/>
                        <span>Google Drive</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={cloudServices.googleDrive}
                                onChange={() => setCloudServices({
                                    ...cloudServices,
                                    googleDrive: !cloudServices.googleDrive
                                })}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                    <div className="service-item">
                        <Cloud className="service-icon onedrive"/>
                        <span>OneDrive</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={cloudServices.oneDrive}
                                onChange={() => setCloudServices({...cloudServices, oneDrive: !cloudServices.oneDrive})}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                </div>
            </section>

            <section className="settings-section">
                <h2>File Paths</h2>
                <div className="file-paths">
                    {paths.map((path, index) => (
                        <div key={index} className="path-item">
                            <input
                                type="text"
                                value={path}
                                onChange={e => {
                                    const newPaths = [...paths];
                                    newPaths[index] = e.target.value;
                                    setPaths(newPaths);
                                }}
                                placeholder="Select a directory..."
                                readOnly  // Make it read-only since we're using the browse button
                            />
                            <button
                                className="browse-button"
                                onClick={() => handleBrowse(index)}
                            >
                                📁 Browse
                            </button>
                            <button
                                className="icon-button"
                                onClick={() => handleRemovePath(index)}
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                    <button className="add-path-button" onClick={handleAddPath}>
                        ➕ Add Path
                    </button>
                </div>
            </section>

            <section className="settings-section">
                <h2>File Types</h2>
                <div className="file-types">
                    <div className="type-item">
                        <FileText className="type-icon"/>
                        <span>Documents</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={fileTypes.documents}
                                onChange={() => setFileTypes({...fileTypes, documents: !fileTypes.documents})}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                    <div className="type-item">
                        <Image className="type-icon"/>
                        <span>Images</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={fileTypes.images}
                                onChange={() => setFileTypes({...fileTypes, images: !fileTypes.images})}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                    <div className="type-item">
                        <Film className="type-icon"/>
                        <span>Videos</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={fileTypes.videos}
                                onChange={() => setFileTypes({...fileTypes, videos: !fileTypes.videos})}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                    <div className="type-item">
                        <Music className="type-icon"/>
                        <span>Audio</span>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={fileTypes.audio}
                                onChange={() => setFileTypes({...fileTypes, audio: !fileTypes.audio})}
                            />
                            <span className="slider"/>
                        </label>
                    </div>
                </div>
            </section>

            <button className="save-button">
                <Save size={18}/> Save Settings
            </button>
        </div>
    );
};

export default Settings;