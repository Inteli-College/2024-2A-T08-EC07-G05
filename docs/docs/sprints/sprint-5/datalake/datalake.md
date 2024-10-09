# Mudança de Estratégia: De MinIO para Supabase no DataLake

# Introdução: A Jornada de Escolha do DataLake

&emsp; No desenvolvimento de um projeto tecnológico, tomar decisões estratégicas é uma constante. À medida que nosso projeto evoluía, estávamos sempre focados em encontrar as melhores ferramentas e soluções para criar um ambiente de dados eficiente e escalável. Inicialmente, escolhemos o MinIO para construir nosso DataLake, mas como em qualquer jornada, revisitar as decisões e buscar o que é mais eficaz tornou-se essencial. Foi assim que, depois de uma cuidadosa análise, decidimos migrar do MinIO para o Supabase.

## Nossa Escolha Inicial: Por que Optamos pelo MinIO?

&emsp; O MinIO era nossa primeira escolha para o DataLake devido à sua compatibilidade com o Amazon S3, flexibilidade open source e desempenho excepcional em cenários de big data. Ele oferecia uma solução robusta para o armazenamento de nossos modelos preditivos e dados gerados a partir do processo de ETL (Extração, Transformação e Carregamento). Com isso, conseguimos integrar nossos fluxos de dados e maximizar a eficiência de armazenamento.
Os Desafios com o MinIO

&emsp; Apesar de todas as vantagens que o MinIO oferecia, logo percebemos alguns desafios ao longo do caminho:

**1 - Complexidade na Configuração:** Configurar e gerenciar o MinIO dentro da nossa estrutura de Docker Compose acabou se mostrando mais complexo do que o previsto. Tínhamos que lidar com variáveis de ambiente, permissões, volumes persistentes e a manutenção de um sistema local, o que aumentava a carga operacional.

**2 - Documentação Técnica:** Embora o MinIO fosse altamente compatível com S3, sua documentação era densa e, muitas vezes, não tão intuitiva para a nossa equipe. Isso gerou um esforço adicional de aprendizado e integração que começou a impactar a produtividade do projeto.

**3 - Integração com o Banco de Dados:** Nosso banco de dados já estava configurado no Supabase, e gerenciar dois ambientes de armazenamento distintos começou a parecer ineficiente. A manutenção de múltiplas plataformas de dados aumentava a complexidade do nosso stack tecnológico.

## A Decisão pela Mudança: Por que Escolhemos o Supabase?

&emsp; Foi durante uma dessas revisões estratégicas que nos perguntamos: "E se pudermos simplificar nosso sistema de armazenamento e aproveitar melhor as ferramentas já disponíveis?" Foi nesse momento que o Supabase emergiu como a solução natural para resolver nossos problemas. Decidimos migrar nosso DataLake para os buckets do Supabase, e as razões foram claras:

**1 - Integração Nativa com o Banco de Dados:** Como nosso banco de dados já estava hospedado no Supabase, fazia todo sentido unificar as soluções em uma única plataforma. Utilizar os buckets do Supabase permitiu uma integração mais direta e simples entre nossos modelos de dados e o armazenamento.

**2 - Facilidade de Uso e Documentação Intuitiva:** A documentação do Supabase se destacou por ser clara e fácil de entender. Essa facilidade de acesso a informações técnicas nos permitiu economizar tempo na implementação e solucionar problemas mais rapidamente, algo que era crucial para manter a velocidade do desenvolvimento do projeto.

**3 - Simplicidade Operacional:** O Supabase ofereceu uma configuração e uma gestão de dados muito mais amigável. Não precisávamos nos preocupar com a complexidade de orquestrar serviços adicionais ou lidar com configurações avançadas de infraestrutura — tudo estava ao nosso alcance em um só lugar.

## Como Implementamos o Supabase

&emsp; A mudança para o Supabase foi suave e planejada, aproveitando ao máximo a arquitetura já existente do projeto. Adaptamos nossos processos de ETL e modelagem para armazenar diretamente os modelos nos buckets do Supabase, facilitando a organização e o acesso aos dados. Essa decisão nos permitiu focar mais em construir e otimizar nossos modelos preditivos, em vez de nos perdermos em camadas de gerenciamento de infraestrutura.

&emsp; Abaixo estão alguns passos de como fizemos a integração com o Supabase:

**1 - Configuração Simples:** Utilizamos as credenciais do Supabase que já estavam configuradas para acessar nosso banco de dados, integrando de forma fácil os buckets no nosso fluxo de dados.
    Acesso Direto aos Dados: Com a API intuitiva do Supabase, conseguimos automatizar processos de armazenamento e recuperação de dados sem esforços adicionais.

**2 - Centralização de Recursos:** Todos os nossos dados, desde informações brutas até os modelos processados, agora estão organizados e acessíveis dentro de uma única plataforma.

## Conclusão: Uma Decisão Estratégica para o Futuro

&emsp; A mudança para o Supabase foi uma decisão estratégica que simplificou nosso desenvolvimento e melhorou nossa eficiência. Unificar nossa infraestrutura de dados trouxe mais clareza para o projeto, eliminando a necessidade de trabalhar com soluções diferentes e difíceis de integrar. O Supabase não só nos proporcionou um armazenamento robusto, mas também alinhou nossos recursos com uma plataforma que já estava profundamente enraizada no projeto, criando um ambiente de dados mais coeso e eficaz.

&emsp; Migrar do MinIO para o Supabase não foi apenas uma troca de tecnologias; foi uma evolução do nosso projeto, uma busca por eficiência e simplicidade que nos ajudará a focar no que realmente importa: desenvolver soluções que fazem a diferença.
Referências

    Supabase Documentation - Documentação oficial do Supabase, acessada para facilitar a integração e uso dos buckets e outros serviços oferecidos.
    
    AWS vs. MinIO Comparison - Comparações e discussões sobre as funcionalidades e complexidades do MinIO em relação ao S3 da AWS, que nos ajudaram a entender suas limitações.