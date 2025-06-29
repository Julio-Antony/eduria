import React from 'react'

const CourseContentForm = ({ contents, setContents }) => {
  const handleSectionChange = (index, field, value) => {
    const updated = [...contents]
    updated[index][field] = value
    setContents(updated)
  }

  const handleModuleChange = (sIdx, mIdx, field, value) => {
    const updated = [...contents]

    const updatedModules = [...updated[sIdx].modules]
    const updatedModule = { ...updatedModules[mIdx], [field]: value }
    updatedModules[mIdx] = updatedModule

    updated[sIdx] = {
      ...updated[sIdx],
      modules: updatedModules,
    }

    console.log(updated)

    setContents(updated)
  }

  const addSection = () => {
    setContents([
      ...contents,
      { title: '', description: '', modules: [] },
    ])
  }

  const removeSection = (idx) => {
    const updated = contents.filter((_, i) => i !== idx)
    setContents(updated)
  }

  const addModule = (sIdx) => {
    const updated = [...contents]
    updated[sIdx].modules.push({
      type: '',
      title: '',
      content: '',
      file: null,
      questions: [],
    })
    setContents(updated)
  }

  const removeModule = (sIdx, mIdx) => {
    const updated = [...contents]
    updated[sIdx].modules = updated[sIdx].modules.filter((_, i) => i !== mIdx)
    setContents(updated)
  }

  return (
    <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      {contents.map((section, sIdx) => (
        <div key={sIdx} className="mb-4 border p-3 rounded">
          <div className="mb-2 d-flex justify-content-between align-items-center">
            <h5>Section {sIdx + 1}</h5>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeSection(sIdx)}
            >
              Hapus Section
            </button>
          </div>

          <input
            className="form-control mb-2"
            placeholder="Judul Section"
            value={section.title}
            onChange={(e) => handleSectionChange(sIdx, 'title', e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Deskripsi Section"
            value={section.description}
            onChange={(e) => handleSectionChange(sIdx, 'description', e.target.value)}
          />

          {section.modules.map((mod, mIdx) => (
            <div key={mIdx} className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6>Modul {mIdx + 1}</h6>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeModule(sIdx, mIdx)}
                  >
                    Hapus
                  </button>
                </div>

                <select
                  className="form-select mb-2"
                  value={mod.type}
                  onChange={(e) => handleModuleChange(sIdx, mIdx, 'type', e.target.value)}
                >
                  <option value="">Pilih Tipe Modul</option>
                  <option value="video">Video</option>
                  <option value="file">File</option>
                  <option value="quiz">Quiz</option>
                  <option value="link">Link</option>
                  <option value="text">Text</option>
                </select>

                <input
                  className="form-control mb-2"
                  placeholder="Judul Modul"
                  value={mod.title}
                  onChange={(e) => handleModuleChange(sIdx, mIdx, 'title', e.target.value)}
                />

                {(mod.type === 'video' || mod.type === 'link') && (
                  <input
                    className="form-control mb-2"
                    placeholder="URL"
                    value={mod.content || ''}
                    onChange={(e) => handleModuleChange(sIdx, mIdx, 'content', e.target.value)}
                  />
                )}

                {mod.type === 'file' && (
                  <div className="mb-2">
                    {/* Tampilkan link jika file sudah diupload (content berupa string URL) */}
                    {typeof mod.content === 'string' && mod.content && (
                      <div className="mb-2">
                        <label className="form-label">File Saat Ini</label><br />
                        <a
                          href={mod.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {mod.content.split('/').pop()}
                        </a>
                      </div>
                    )}

                    {/* Jika sedang menginput file baru, tampilkan namanya sebelum submit */}
                    {mod.content instanceof File && (
                      <div className="mb-2">
                        <label className="form-label">File Baru</label><br />
                        <span className="text-secondary">{mod.content.name}</span>
                      </div>
                    )}

                    {/* Input File */}
                    <label className="form-label">Upload File</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        handleModuleChange(sIdx, mIdx, 'file', e.target.files[0])
                      }
                    />
                  </div>
                )}


                {mod.type === 'text' ? (
                  <textarea
                    className="form-control mb-2"
                    placeholder="Konten teks"
                    onChange={(e) => handleModuleChange(sIdx, mIdx, 'content', e.target.value)}
                  />
                ) : null}

                {mod.type === 'quiz' && (
                  <p className="text-muted">(Tambahkan fitur soal quiz jika diperlukan)</p>
                )}
              </div>
            </div>
          ))}

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => addModule(sIdx)}
          >
            + Tambah Modul
          </button>
        </div>
      ))}

      <div className="text-center">
        <button className="btn btn-success" onClick={addSection}>
          + Tambah Section
        </button>
      </div>
    </div>
  )
}

export default CourseContentForm
