
## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil con Expo Go o emulador

### Pasos de Instalación

1. Descargar el repositorio 

2. **Instalar dependencias**
```bash
npm install
# o si usas yarn
yarn install
```

3. **Iniciar el proyecto**
```bash
npm start
```
4. **Ejecutar en dispositivo móvil**
Android:
```bash
npm run android
# o
yarn android
```
Ios:
```bash
npm run ios
# o
yarn ios
```

6. **Ejecutar tests**
```bash
npm test
# o
yarn test
```


### Patrón de Diseño
- **Feature-based Architecture**: Organización por características/funcionalidades
- **Clean Architecture**: Separación de responsabilidades con capas bien definidas
- **Component-based**: Componentes reutilizables y modulares

### Tecnologías Utilizadas
- **React Native + Expo**: Framework principal
- **TypeScript**: Tipado estático
- **React Navigation**: Navegación entre pantallas
- **Zustand**: Gestión de estado global
- **TanStack Query**: Cache y gestión de datos remotos
- **AsyncStorage**: Persistencia local
- **Expo Vector Icons**: Iconografía


## 🚀 Características

- **Lista de Noticias**: Visualización de noticias con imágenes, título y contenido
- **Búsqueda**: Búsqueda por título o contenido de las noticias
- **Detalle de Noticia**: Vista detallada de cada noticia
- **Lista de Usuarios**: Visualización de usuarios con información de contacto
- **Favoritos**: Sistema para marcar y gestionar noticias favoritas
- **Persistencia**: Los favoritos se guardan localmente
- **Cache**: Datos cacheados para mejor rendimiento
- **Responsive**: Adaptado para diferentes tamaños de pantalla

## 🏗️ Arquitectura

### 1. Arquitectura Feature-Based
**Decisión**: Organizar el código por características en lugar de por tipo de archivo.

**Razón**:

La estructura adoptará un enfoque basado en features (funcionalidades), permitiendo una organización modular, escalable y fácilmente mantenible.

Esta arquitectura favorece la reutilización de componentes, la localización rápida del código relevante y reduce el acoplamiento entre secciones del sistema.

## ✅ Principios Respetados de clean arquitecture respetados:

- Dependency Inversion: Las capas externas dependen de abstracciones
- Single Responsibility: Cada feature tiene una responsabilidad específica
- Open/Closed: Fácil extensión sin modificar código existente
- Testability: Cada capa se puede testear independientemente
- Common Closure Principle: los componentes de las features se agrupan de manera que cuando un cambio afecta una feature  impacta solo en los componentes de ella y no en otras features.



Flujo de dependencias:
```
Presentation → Application → Domain ← Infrastructure
     ↓           	↓           ↑    		   ↑
   UI/UX         Use Cases   Entities       HTTP Clients
  Components     Hooks       Types   	    Api client
  Screens        Stores      Interfaces
                 Providers
                 Router
```
### 2. Gestión de Estado con Zustand
**Decisión**: Usar Zustand en lugar de Redux o Context API.

**Razón**:
- Menor boilerplate que Redux
- Mejor rendimiento que Context API
- API simple e intuitiva
- Excelente integración con TypeScript
- Persistencia automática con AsyncStorage

### 3. Cache y Fetching con TanStack Query
**Decisión**: Implementar TanStack Query para manejo de datos remotos.

**Razón**:
- Cache automático e inteligente
- Sincronización en background
- Manejo de estados de loading/error
- Invalidación automática de cache
- Optimistic updates

### 4. Navegación con React Navigation v7
**Decisión**: Usar React Navigation con Stack y Bottom Tabs.

**Razón**:
- Estándar de facto en React Native
- Excelente integración con TypeScript
- Navegación nativa y performante
- Amplia documentación y comunidad

### 5. Persistencia con AsyncStorage
**Decisión**: Usar AsyncStorage para guardar favoritos.

**Razón**:
- Nativo de React Native
- Simple para datos pequeños
- Integración perfecta con Zustand
- No requiere configuración adicional

## 🛠️ Bibliotecas Externas

### Dependencias Principales

| Biblioteca | Versión | Propósito |
|------------|---------|----------|
| `@tanstack/react-query` | ^5.84.1 | Cache y gestión de datos remotos |
| `zustand` | ^5.0.7 | Gestión de estado global |
| `@react-navigation/native` | ^7.1.17 | Navegación entre pantallas |
| `@react-native-async-storage/async-storage` | ^2.2.0 | Persistencia local |
| `@expo/vector-icons` | ^14.1.0 | Iconografía |

### Dependencias de Desarrollo

| Biblioteca | Versión | Propósito |
|------------|---------|----------|
| `@testing-library/react-native` | ^13.2.2 | Testing de componentes |
| `jest` | ^30.0.5 | Framework de testing |
| `ts-jest` | ^29.4.0 | Soporte TypeScript en Jest |
| `typescript` | ~5.8.3 | Tipado estático |
