import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Logo = () => (
  <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
    <path d="M46.3201 24.18C45.4801 24.18 44.6401 24.18 43.7401 24.18C43.7401 19.92 43.7401 15.72 43.7401 11.46C44.3401 11.46 45.0001 11.4 45.6001 11.46C45.9601 11.52 46.2001 11.82 46.3801 12.06C48.0001 14.1 49.6201 16.14 51.2401 18.18C51.5401 18.6 51.9001 18.96 52.2601 19.44C52.2601 16.74 52.2601 14.1 52.2601 11.46C53.1601 11.46 54.0001 11.46 54.8401 11.46C54.8401 15.72 54.8401 19.92 54.8401 24.18C54.2401 24.18 53.5801 24.24 52.9801 24.12C52.5601 24.06 52.3201 23.76 52.0801 23.46C50.3401 21.3 48.6001 19.08 46.8601 16.92C46.6801 16.68 46.5001 16.5 46.2601 16.2C46.3201 18.9 46.3201 21.54 46.3201 24.18Z" fill="#111111"/>
    <path d="M92.5201 13.02C92.2201 13.44 91.9801 13.92 91.6201 14.34C91.3201 14.76 90.9001 14.82 90.4201 14.46C89.6401 13.98 88.8001 13.68 87.8401 13.68C85.9201 13.68 84.6601 14.64 84.2401 16.5C83.9401 17.7 84.0601 18.9 84.6001 20.04C85.5601 22.02 87.9601 22.32 89.5801 21.66C89.7001 21.6 89.7601 21.48 89.7601 21.36C89.7601 20.82 89.7601 20.28 89.7601 19.68C89.3401 19.68 88.9201 19.68 88.5601 19.68C88.0801 19.68 87.9001 19.5 87.9001 19.02C87.9001 18.54 87.9001 18.06 87.9001 17.52C88.6801 17.52 89.4001 17.52 90.1801 17.52C90.9001 17.52 91.6801 17.52 92.3401 17.52C92.4601 17.7 92.4001 17.88 92.4001 18C92.4001 19.5 92.4001 21 92.4001 22.44C92.4001 22.8 92.2801 22.98 92.0401 23.16C90.5401 24.12 88.9201 24.36 87.1801 24.24C86.3401 24.18 85.5001 24 84.7201 23.64C81.9601 22.38 80.5801 19.8 81.0001 16.74C81.4801 13.44 83.8801 11.34 87.2401 11.28C88.9201 11.22 90.4801 11.52 91.8601 12.54C92.1601 12.66 92.4001 12.78 92.5201 13.02Z" fill="#111111"/>
    <path d="M78.84 24.18C76.08 24.18 73.3801 24.18 70.6801 24.18C70.6801 19.92 70.6801 15.72 70.6801 11.46C73.3801 11.46 76.08 11.46 78.84 11.46C78.84 12.18 78.84 12.9 78.84 13.74C77.1 13.74 75.4201 13.74 73.6801 13.74C73.6801 14.76 73.6801 15.66 73.6801 16.68C75.0001 16.68 76.32 16.68 77.64 16.68C77.64 17.46 77.64 18.12 77.64 18.9C76.32 18.9 75.0001 18.9 73.6801 18.9C73.6801 19.92 73.6801 20.88 73.6801 21.9C75.4201 21.9 77.1 21.9 78.9 21.9C78.84 22.68 78.84 23.4 78.84 24.18Z" fill="#111111"/>
    <path d="M57.7201 13.74C57.7201 12.96 57.7201 12.18 57.7201 11.4C61.0801 11.4 64.4401 11.4 67.8601 11.4C67.8601 12.18 67.8601 12.9 67.8601 13.68C66.7201 13.68 65.5201 13.68 64.3201 13.68C64.3201 17.16 64.3201 20.64 64.3201 24.12C63.3001 24.12 62.3401 24.12 61.3201 24.12C61.3201 20.64 61.3201 17.22 61.3201 13.74C60.0601 13.74 58.9201 13.74 57.7201 13.74Z" fill="#111111"/>
    <path d="M36.9601 11.46C37.9201 11.46 38.8801 11.46 39.9001 11.46C39.9001 15.72 39.9001 19.92 39.9001 24.18C38.9401 24.18 37.9801 24.18 36.9601 24.18C36.9601 19.92 36.9601 15.72 36.9601 11.46Z" fill="#111111"/>
    <path d="M102.54 18.84C103.14 19.2 103.5 19.68 103.8 20.22C104.58 21.48 105.36 22.8 106.14 24.06C106.08 24.24 105.9 24.18 105.84 24.18C105.12 24.18 104.4 24.18 103.68 24.18C103.08 24.18 102.6 23.94 102.3 23.4C101.76 22.38 101.16 21.42 100.62 20.4C100.08 19.44 99.9601 19.38 98.7601 19.5C98.7601 21 98.7601 22.56 98.7601 24.12C97.7401 24.12 96.7801 24.12 95.8201 24.12C95.8201 19.92 95.8201 15.66 95.8201 11.4C95.8801 11.4 95.9401 11.34 96.0001 11.34C97.6801 11.34 99.3601 11.28 101.04 11.4C101.58 11.46 102.06 11.52 102.54 11.7C103.98 12.18 104.88 13.08 105.06 14.58C105.24 16.14 104.7 17.46 103.38 18.36C103.08 18.6 102.84 18.66 102.54 18.84ZM100.8 17.28C101.7 17.04 102.18 16.32 102.12 15.36C102.12 14.46 101.58 13.92 100.68 13.74C100.02 13.62 99.4201 13.68 98.7601 13.68C98.7601 14.94 98.7601 16.2 98.7601 17.46C99.4801 17.46 100.14 17.46 100.8 17.28Z" fill="#111111"/>
    <path d="M120 24.18C119.28 24.18 118.5 24.18 117.78 24.18C117.24 24.18 116.94 23.88 116.76 23.4C116.52 22.74 116.28 22.02 116.04 21.36C114.42 21.36 112.8 21.36 111.18 21.36C110.94 21.96 110.76 22.62 110.52 23.28C110.28 24 109.98 24.18 109.26 24.24C108.6 24.24 107.88 24.24 107.16 24.24C107.58 23.22 107.94 22.32 108.3 21.36C109.5 18.24 110.76 15.06 111.96 11.94C112.08 11.58 112.26 11.46 112.68 11.46C113.4 11.52 114.06 11.46 114.78 11.46C115.08 11.46 115.26 11.52 115.32 11.82C116.88 15.84 118.44 19.86 120 23.88C120 23.94 120.06 24 120 24.18ZM113.58 14.16C112.98 15.9 112.44 17.58 111.84 19.26C113.04 19.26 114.12 19.26 115.32 19.26C114.78 17.58 114.18 15.9 113.58 14.16Z" fill="#111111"/>
    <path d="M31.92 10.08L16.62 0.720006C16.5 0.660006 16.32 0.600006 16.2 0.600006C16.02 0.600006 15.9 0.660006 15.72 0.720006L0.42 10.08C0.18 10.2 0 10.5 0 10.8V24.96C0 25.26 0.18 25.56 0.42 25.74L15.72 35.28C15.84 35.4 16.02 35.4 16.2 35.4C16.38 35.4 16.56 35.34 16.68 35.28L31.98 25.74C32.22 25.56 32.4 25.26 32.4 24.96V10.8C32.34 10.5 32.22 10.2 31.92 10.08ZM16.2 19.26L14.82 18.42L13.08 19.5L15.3 20.88V32.94L2.64 25.02L16.2 16.74L17.58 17.58L19.32 16.5L17.1 15.18V3.12001L29.76 10.86L16.2 19.26ZM9.96 17.52L11.7 16.44L2.64 10.86L15.3 3.12001V15.18L1.8 23.4V12.42L9.96 17.52ZM30.54 23.4L22.38 18.42L20.64 19.5L29.7 25.02L17.1 32.88V20.82L30.6 12.42V23.4H30.54Z" fill="url(#paint0_linear)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="4.69782" y1="29.3918" x2="27.4103" y2="6.67926" gradientUnits="userSpaceOnUse">
      <stop stopColor="#0056F5"/>
      <stop offset="1" stopColor="#33CCF4"/>
      </linearGradient>
      <clipPath id="clip0">
      <rect width="120" height="36" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

const PdfIcon = () => (
  <Image src="/pdf.svg" alt="PDF icon" width="200px" height="75px"/>
)

export default function Home() {
  const [isDraggingFileOver, setIsDraggingFileOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [jsonResponse, setJsonResponse] = React.useState({});

  const onSelectFile = async (files) => {
    setIsUploading(true)
    try {
      // const data = new FormData();
      // for (const file of files) {
      //   data.append('files[]', file, file.name)
      // }
      // const response = await fetch('https://integraapiproduction.azurewebsites.net/analyze/', {
      //   method: 'POST',
      //   body: data,
      // });
      // setJsonResponse(await response.json());
      let i = 1
      const allJsonResponses = {}
      for (const file of files) {
        const data = new FormData();
        data.append('file', file, file.name)
        const response = await fetch('https://integraapiproduction.azurewebsites.net/analyze/', {
          method: 'POST',
          body: data,
        });
        allJsonResponses[i.toString()] = await response.json()
        i++
      }
      setJsonResponse(allJsonResponses)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Integra drag and drop starter</title>
        <meta name="description" content="This is a simple node application developed by Integra to help other developers get a head start on processing Smart Documents.  The application simply takes a Smart PDF Document and checks the hash of the document against the Integra Ledger Blockchain, if it is valid it will return the metadata contained within the document and return it to the user.  The repo can be found at https://github.com/IntegraLedger/DragAndDropStarter." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <div />
        </header>

        <div className={styles.bg}>
          <div className={styles.content}>
            <h1>
              Integra Drag and Drop Starter App
            </h1>

            <p>
              This is a simple node application developed by Integra to help other
              developers get a head start on processing Smart Documents.
              The application simply takes a Smart PDF Document and checks
              the hash of the document against the Integra Ledger Blockchain, 
              if it is valid it will return the metadata contained within
              the document and return it to the user as a JSON object.
              The repo can be found at:
            </p>

            <a href="https://github.com/IntegraLedger/DragAndDropStarter">
              https://github.com/IntegraLedger/DragAndDropStarter
            </a>
          </div>
        </div>

        <div className={styles.uploadContainer}>
          <form className={styles.uploadBox}>
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setIsDraggingFileOver(true);
              }}
              // 9% global support as of August 2021
              onDragExit={(e) => {
                setIsDraggingFileOver(false);
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                setIsDraggingFileOver(false);
                e.preventDefault();
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingFileOver(false);
                onSelectFile(e.dataTransfer.files);
              }}
            >
              {
                Object.keys(jsonResponse).length ? (
                  <p style={{whiteSpace: 'pre'}}>
                    {JSON.stringify(jsonResponse, null, 2)}
                  </p>
                ) : (
                  <div
                    className={styles.uploadContent}
                  >
                    <PdfIcon />
                    <h2>
                      Drag and drop PDF documents here  
                    </h2>
      
                    <div className={styles.orSection}>
                      <span className={styles.orLine} />
                      <p> OR </p>
                      <span className={styles.orLine} />
                    </div>
      
                    <div className={styles.uploadSection}>
                      <label
                        htmlFor="fileUpload"
                        className={`${styles.uploadButton} ${isUploading ? styles.uploadButtonDisabled : ''}`}
                      >
                        Browse pdf files from your computer
                        <input
                          multiple
                          id="fileUpload"
                          style={{
                            display: 'none',
                          }}
                          required={true}
                          className={styles.fileInput}
                          type="file"
                          name="fileUpload"
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,.txt,application/pdf,.pdf,text/html"
                          onChange={(e) => {
                            onSelectFile(e.target.files);
                          }}
                        />                
                      </label>
                    </div>
                  </div>
                )
              }
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
