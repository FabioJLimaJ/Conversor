from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from fastapi.responses import StreamingResponse
from io import BytesIO

import tempfile
from pathlib import Path
import aspose.words_foss as aw

app = FastAPI()
origins = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,
    allow_methods=["*"],            
    allow_headers=["*"],            
)

@app.post("/upload")
async def enviar_arquivo(tipo: str = Form(...),
                         arquivo: UploadFile = File(...),
                         tipo_desejado: str = Form(...)
                         ):

    tipo_arquivo = Path(arquivo.filename).suffix.replace(".", "")
    
    
    if not arquivo or not tipo or not tipo_desejado:
        return {"mensagem": "arquivo sem extensão"}
    
    if tipo_arquivo in ["png", "jpg", "jpeg", "webp", "gif"]:
            saida = BytesIO()
            conteudo = await arquivo.read()
            imagem = Image.open(BytesIO(conteudo))
        
            if imagem.format.lower() == tipo_desejado.lower():
                return {"mensagem": "o tipo da imagem já é o desejado"}
                
        
            if imagem.format.lower() == tipo.lower():
        
                imagem = imagem.convert("RGB")
                imagem.save(saida, format=tipo_desejado.upper())
                saida.seek(0)
                return StreamingResponse(
                                saida, 
                                media_type=f"image/{tipo_desejado.lower()}",
                                headers={
                                    "Content-Disposition": f'attachment; filename="imagem_convertida.{tipo_desejado.lower()}"'
                                }
                            )
        
            elif imagem.format != tipo.lower():
                return {"mensagem": "tipos errados"}
        
    
    if tipo_arquivo in ["docx", "doc", "txt"]:
        conteudo = await arquivo.read()

        with tempfile.TemporaryDirectory() as pasta:
            entrada = Path(pasta) / f"entrada.{tipo_arquivo}"
            entrada.write_bytes(conteudo)

            document = aw.Document(str(entrada))
            print(type(document))
            print(dir(document))
            destino = tipo_desejado.lower()

            saida = Path(pasta) / f"documento.{destino}"

            document.save(str(saida))
            conteudo_convertido = saida.read_bytes()

        return StreamingResponse(
            BytesIO(conteudo_convertido),
            media_type="application/pdf",
            headers={
            "Content-Disposition": f'attachment; filename="documento.{destino}"'
            }
        )
        


