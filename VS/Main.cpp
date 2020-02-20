#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <glm/glm.hpp>

#include <iostream>
#include <vector>
#include <stdio.h>
#include <string>
#include <cstring>
#include <algorithm>

#include "objloader.h"


//Funktion som ändrar GLFW-fönstrets storlek när fönstret ändras
void framebuffer_size_callback(GLFWwindow* window, int width, int height) {
	//Sätt storlek på renderingsfönstret (så OpenGL vet att anpassa koordinater till fönster)
	glViewport(0, 0, width, height);
}

int main()
{
	//Initialisera GLFW
	glfwInit();

	//Detta skulle sätta krav på glfw versionen 
	//glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	//glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);


	//Skapa ett GLFW-fönster 
	GLFWwindow* window = glfwCreateWindow(640, 480, "TestingTesting", NULL, NULL);
	if (window == NULL) {
		std::cout << "Failed to create GLFW window" << std::endl;
		glfwTerminate();
		return -1;
	}
	glfwMakeContextCurrent(window); //Krävs för att använda OpenGL API:t

	//Initilisera GLAD som "manages function pointers" för OpenGL
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
		std::cout << "Failed to initialize GLAD" << std::endl;
		return -1;
	}

	//GLFW ska kalla på framebuffer_size_callback när fönstret ändrar storkel
	glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

	std::vector< glm::vec3 > vertices;
	std::vector< glm::vec2 > uvs;
	std::vector< glm::vec3 > normals; // Won't be used at the moment.
	bool res = loadOBJ("testing.obj", vertices, uvs, normals);

	//glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(glm::vec3), &vertices[0], GL_STATIC_DRAW);

	//Redering loop
	//Så att inte en bild ritas sedan stängs fönstret
	while (!glfwWindowShouldClose(window)) {

		glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT);

		glfwSwapBuffers(window); //Byter färgbuffer, dvs visar output på skärmen
		glfwPollEvents(); //Kollar om events är triggade
	}

	glfwTerminate();
	return 0;
}
