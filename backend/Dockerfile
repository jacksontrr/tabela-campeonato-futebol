# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ChampionshipTable.sln .
COPY ChampionshipTable.Domain/ChampionshipTable.Domain.csproj ChampionshipTable.Domain/
COPY ChampionshipTable.Application/ChampionshipTable.Application.csproj ChampionshipTable.Application/
COPY ChampionshipTable.Infrastructure/ChampionshipTable.Infrastructure.csproj ChampionshipTable.Infrastructure/
COPY ChampionshipTable.WebAPI/ChampionshipTable.WebAPI.csproj ChampionshipTable.WebAPI/

# Restore dependencies
RUN dotnet restore

# Copy all source files
COPY . .

# Build and publish
WORKDIR /src/ChampionshipTable.WebAPI
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "ChampionshipTable.WebAPI.dll"]
