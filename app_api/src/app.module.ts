import { Module } from '@nestjs/common';
import { CommunityModule } from './modules/comunidades/comunidades.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { TextoPalavraChaveModule } from './modules/texto_palavra_chave/texto_palavra_chave.module';
import { FonteInformacaoModule } from './modules/fonteInformacao/fonte_informacao.module';
import { TextoColetadoModule } from './modules/textoColetado/textoColetado.module';

@Module({
  imports: [
    CommunityModule,
    CategoriaModule,
    TextoPalavraChaveModule,
    FonteInformacaoModule,
    TextoColetadoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
