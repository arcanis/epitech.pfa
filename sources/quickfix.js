//!provides:quickfix
// todo : remove it

if (typeof (THREE) !== 'undefined') {

THREE.GeometryUtils.merge = function ( geometry1, object2 /* object3D | geometry */, recursive ) {

		var undefined,
		geometry2 = object2 instanceof THREE.Geometry ? object2 : object2.geometry,
		children2 = object2 instanceof THREE.Object3D ? object2.children : undefined;

		var i, il, j, jl;

		if ( object2 instanceof THREE.Object3D ) {

			object2.updateMatrixWorld( true );

		}

		if ( geometry2 !== undefined ) {

			var matrix, matrixRotation,
			vertexOffset = geometry1.vertices.length,
			uvPosition = geometry1.faceVertexUvs[ 0 ].length,
			vertices1 = geometry1.vertices,
			vertices2 = geometry2.vertices,
			faces1 = geometry1.faces,
			faces2 = geometry2.faces,
			uvs1 = geometry1.faceVertexUvs[ 0 ],
			uvs2 = geometry2.faceVertexUvs[ 0 ];

			var geo1MaterialsMap = {};

			for ( i = 0; i < geometry1.materials.length; ++ i ) {

				var id = geometry1.materials[ i ].id;

				geo1MaterialsMap[ id ] = i;

			}

			if ( object2 instanceof THREE.Mesh ) {

				matrix = object2.matrixWorld;
				matrixRotation = new THREE.Matrix4();
				matrixRotation.extractRotation( matrix, object2.scale );

			}

			// vertices

			for ( i = 0, il = vertices2.length; i < il; ++ i ) {

				var vertex = vertices2[ i ];

				var vertexCopy = new THREE.Vertex( vertex.position.clone() );

				if ( matrix ) matrix.multiplyVector3( vertexCopy.position );

				vertices1.push( vertexCopy );

			}

			// faces

			for ( i = 0, il = faces2.length; i < il; ++ i ) {

				var face = faces2[ i ], faceCopy, normal, color,
				faceVertexNormals = face.vertexNormals,
				faceVertexColors = face.vertexColors;

				if ( face instanceof THREE.Face3 ) {

					faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );

				} else if ( face instanceof THREE.Face4 ) {

					faceCopy = new THREE.Face4( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset, face.d + vertexOffset );

				}

				faceCopy.normal.copy( face.normal );

				if ( matrixRotation ) matrixRotation.multiplyVector3( faceCopy.normal );

				for ( j = 0, jl = faceVertexNormals.length; j < jl; ++ j ) {

					normal = faceVertexNormals[ j ].clone();

					if ( matrixRotation ) matrixRotation.multiplyVector3( normal );

					faceCopy.vertexNormals.push( normal );

				}

				faceCopy.color.copy( face.color );

				for ( j = 0, jl = faceVertexColors.length; j < jl; ++ j ) {

					color = faceVertexColors[ j ];
					faceCopy.vertexColors.push( color.clone() );

				}

				if ( face.materialIndex !== undefined ) {

					var material2 = geometry2.materials[ face.materialIndex ];
					var materialId2 = material2.id;

					var materialIndex = geo1MaterialsMap[ materialId2 ];

					if ( materialIndex === undefined ) {

						materialIndex = geometry1.materials.length;
						geometry1.materials.push( material2 );

					}

					faceCopy.materialIndex = materialIndex;

				}

				faceCopy.centroid.copy( face.centroid );
				if ( matrix ) matrix.multiplyVector3( faceCopy.centroid );

				faces1.push( faceCopy );

			}

			// uvs

			for ( i = 0, il = uvs2.length; i < il; ++ i ) {

				var uv = uvs2[ i ], uvCopy = [];

				for ( j = 0, jl = uv.length; j < jl; ++ j ) {

					uvCopy.push( new THREE.UV( uv[ j ].u, uv[ j ].v ) );

				}

				uvs1.push( uvCopy );

			}

		}

		if ( recursive === true && children2 !== undefined ) {

			for ( i = 0, il = children2.length; i < il; ++ i ) {

				this.merge( geometry1, children2[ i ] );

			}

		}

	};

}
