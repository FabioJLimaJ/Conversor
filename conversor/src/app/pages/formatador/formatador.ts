import { Component, inject, signal } from '@angular/core';
import { Conversor } from '../../services/conversor';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-formatador',
  styleUrl: './formatador.css',
  templateUrl: './formatador.html',
})
export class Formatador {
  conversorService = inject(Conversor);

  tipoOriginal: string = '';
  arquivoSelecionado: File = null as any;
  tipoDesejado: string = '';
  mensagemStatus = signal('');
  corAviso = signal('');


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;

    }
  }

  enviarArquivo() {

    if(!this.tipoOriginal || !this.arquivoSelecionado || !this.tipoDesejado) {
      this.mensagemStatus.set('Por favor, preencha todos os campos antes de enviar o arquivo.');
      this.corAviso.set('bg-red-600');
      return;
    }


    const formData = new FormData();

    formData.append('tipo', this.tipoOriginal);
    formData.append('arquivo', this.arquivoSelecionado, this.arquivoSelecionado.name);
    formData.append('tipo_desejado', this.tipoDesejado);

    this.conversorService.enviarArquivo(formData).subscribe({
      next: async (resposta: Blob) => {

        if (resposta.type.includes('json')) {
          const texto = await resposta.text();
          const dados = JSON.parse(texto);
          this.mensagemStatus.set(dados.mensagem);
          this.corAviso.set('bg-red-600');
          return;
        }

        const blobUrl = URL.createObjectURL(resposta);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `arquivo_convertido.${this.tipoDesejado}`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);

        this.mensagemStatus.set('Arquivo convertido com sucesso!');
        this.corAviso.set('bg-green-600');
      },
      error: (erro) => {
        console.error('Erro ao enviar o arquivo:', erro);
      }
    });
  }



  ngOnInit() {
    this.trocarTema();
  }

  fundo = "";
  cor_form = "";
  titulo = "";
  ativo = true;

  trocarTema() {
    this.ativo ? this.fundoPreto() : this.fundoBranco();
    this.ativo = !this.ativo;
  }

  fundoPreto() {
    this.fundo = "bg-slate-950"
    this.cor_form = "bg-slate-900";
    this.titulo = "text-gray-200";
  }

  fundoBranco() {
    this.fundo = "bg-gray-100";
    this.cor_form = "bg-white";
    this.titulo = "text-gray-900";

  }
}
