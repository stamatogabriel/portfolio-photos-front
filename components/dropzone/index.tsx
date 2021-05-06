/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useField } from '@unform/core'

import { Container } from './styles'

interface Props {
  name: string
}

interface InputRefProps extends HTMLInputElement {
  acceptedFiles: File[]
}

const ReactDropzoneInput: React.FC<Props> = ({ name }) => {
  const inputRef = useRef<InputRefProps>(null)
  const { fieldName, registerField, defaultValue = [] } = useField(name)
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>(defaultValue || [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (onDropAcceptedFiles) => {
      if (inputRef.current) {
        inputRef.current.acceptedFiles = onDropAcceptedFiles
        setAcceptedFiles(onDropAcceptedFiles)
      }
    },
  })
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputRefProps) => {
        return ref.acceptedFiles || []
      },
      clearValue: (ref: InputRefProps) => {
        ref.acceptedFiles = []
        setAcceptedFiles([])
      },
      setValue: (ref: InputRefProps, value) => {
        ref.acceptedFiles = value
        setAcceptedFiles(value)
      },
    })
  }, [fieldName, registerField])
  return (
    <Container {...getRootProps()} onClick={() => inputRef.current?.click()}>
      <input {...getInputProps()} accept="image/*" ref={inputRef} />
      {isDragActive ? (
        <p>Solte os arquivos aqui ...</p>
      ) : (
        <p>
          {Array.isArray(acceptedFiles) && acceptedFiles.length
            ? acceptedFiles[0].name
            : 'Arraste e solte o arquivo aqui, ou clique para selecioná-lo na pasta de seu computador'}
        </p>
      )}
    </Container>
  )
}

export default ReactDropzoneInput
