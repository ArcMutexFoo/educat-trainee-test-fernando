
# Educat Trainee

Um projeto fullstack feito em react e python com django para gerenciar tasks


## Run Locally

### Clone o repositorio

```bash
  git clone https://github.com/ArcMutexFoo/educat-trainee-test-fernando.git
```

```bash
  cd educat-trainee-test-fernando
```

### Rode o projeto

#### Usando docker

Use o comando para usar o docker compose

```bash
docker compose up -d
```

### Decisoes tomadas

#### Back-end

No back-end, eu opter por usar django ao inves de nodejs por ser o que a empresa ja usa de tecnologia, usei um banco de dados sqlite pois seria a tecnologia mais simples para um projeto desse tipo.

Na questao arquitetural do projeto, eu optei por usar classes para as models do ORM e funções para o restante.

#### Front-end

No front-end, eu optei por usar React + Vite pois seria uma escolha segura, dentre as tantas formas de se usar react hoje em dia, estou usando MUI como instruido para biblioteca de componentes, como roteador estou usando React Router 7 na versao declarativa, pois quando em comparacao com as outras: Data e Framework, me pareceu a melhor escolha, pois se parecia mais com a versao do react router ja usada internamente.