# Swagger API Documentation

This backend now includes Swagger/OpenAPI documentation for all endpoints.

## Accessing the Documentation

When the backend server is running, you can access the Swagger UI at:

```
http://localhost:3000/api/docs
```

## Current Endpoints

### GET /api
- **Description**: Get application data
- **Response**: Returns a welcome message from the API
- **Response Type**: `AppDataDto`

### GET /api/health
- **Description**: Health check endpoint
- **Response**: Returns the current health status and timestamp
- **Response Type**: `HealthResponseDto`

## Adding New Endpoints with Swagger

When adding new endpoints, make sure to:

1. **Import Swagger decorators**:
   ```typescript
   import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
   ```

2. **Use `@ApiTags`** to group endpoints:
   ```typescript
   @ApiTags('users')
   @Controller('users')
   ```

3. **Document each endpoint** with `@ApiOperation` and `@ApiResponse`:
   ```typescript
   @Get(':id')
   @ApiOperation({ summary: 'Get user by ID' })
   @ApiResponse({ 
     status: 200, 
     description: 'User found',
     type: UserDto 
   })
   @ApiResponse({ 
     status: 404, 
     description: 'User not found' 
   })
   getUser(@Param('id') id: string) {
     // implementation
   }
   ```

4. **Create DTOs** for request/response types:
   ```typescript
   import { ApiProperty } from '@nestjs/swagger';

   export class CreateUserDto {
     @ApiProperty({
       description: 'User name',
       example: 'John Doe',
     })
     name: string;

     @ApiProperty({
       description: 'User email',
       example: 'john@example.com',
     })
     email: string;
   }
   ```

## Configuration

The Swagger configuration is located in `src/main.ts`:
- **Title**: Delbot API
- **Description**: The Delbot API documentation
- **Version**: 1.0
- **Base Path**: `/api/docs`

You can modify these settings by updating the `DocumentBuilder` configuration in `main.ts`.










