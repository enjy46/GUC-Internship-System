document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let localStream = null;
    let remoteStream = null;
    let peerConnection = null;
    let isVideoEnabled = true;
    let isAudioEnabled = true;
    let isScreenSharing = false;

    // DOM Elements
    const appointmentForm = document.getElementById('appointmentForm');
    const videoCallContainer = document.getElementById('videoCallContainer');
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const startCallBtn = document.getElementById('startCallBtn');
    const endCallBtn = document.getElementById('endCallBtn');
    const toggleVideoBtn = document.getElementById('toggleVideoBtn');
    const toggleAudioBtn = document.getElementById('toggleAudioBtn');
    const shareScreenBtn = document.getElementById('shareScreenBtn');
    const appointmentStatus = document.getElementById('appointmentStatus');
    const startVideoCallBtn = document.getElementById('startVideoCallBtn');

    // Initialize WebRTC
    async function initializeWebRTC() {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localVideo.srcObject = localStream;
            
            // Enable buttons after successful initialization
            startCallBtn.disabled = false;
            toggleVideoBtn.disabled = false;
            toggleAudioBtn.disabled = false;
            shareScreenBtn.disabled = false;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            showNotification('Error accessing camera and microphone. Please check your permissions.');
        }
    }

    // Handle appointment form submission
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(appointmentForm);
        const appointmentData = {
            date: formData.get('date'),
            time: formData.get('time'),
            reason: formData.get('reason'),
            notes: formData.get('notes')
        };

        try {
            // Show appointment status
            showAppointmentStatus('Appointment request submitted successfully!', 'success');
            
            // Show video call section
            const videoCallSection = document.getElementById('videoCallSection');
            videoCallSection.style.display = 'block';
            
            // Update video call info
            document.getElementById('callDate').textContent = formatDate(appointmentData.date);
            document.getElementById('callTime').textContent = formatTime(appointmentData.time);
            document.getElementById('callReason').textContent = formatReason(appointmentData.reason);
            
            // Update user status
            document.getElementById('userStatus').textContent = 'Online';
            document.getElementById('userStatus').style.color = '#28a745';
            
            // Initialize video call functionality
            await initializeVideoCall();
            
            // Show notification
            showNotification('Video call section is ready!');
        } catch (error) {
            console.error('Error submitting appointment:', error);
            showAppointmentStatus('Error submitting appointment. Please try again.', 'error');
        }
    });

    // Helper functions for formatting
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    }

    function formatReason(reason) {
        const reasons = {
            'career_guidance': 'Career Guidance',
            'report_clarification': 'Report Clarification',
            'other': 'Other'
        };
        return reasons[reason] || reason;
    }

    // Show appointment status
    function showAppointmentStatus(message, type) {
        const statusElement = document.getElementById('appointmentStatus');
        statusElement.textContent = message;
        statusElement.className = `appointment-status ${type}`;
        statusElement.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }

    // Start video call
    startCallBtn.addEventListener('click', async function() {
        try {
            // Simulate starting a call
            showNotification('Starting video call...');
            
            // Update UI
            startCallBtn.disabled = true;
            endCallBtn.disabled = false;
            
            // Simulate connection
            await new Promise(resolve => setTimeout(resolve, 2000));
            showNotification('Connected to career counselor');
            
            // Update video call info
            document.getElementById('callStatus').textContent = 'Connected';
            document.getElementById('callDuration').textContent = '00:00';
            
            // Start call duration timer
            startCallTimer();
        } catch (error) {
            console.error('Error starting call:', error);
            showNotification('Error starting call. Please try again.');
        }
    });

    // End video call
    endCallBtn.addEventListener('click', function() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        
        if (peerConnection) {
            peerConnection.close();
        }
        
        // Reset UI
        startCallBtn.disabled = false;
        endCallBtn.disabled = true;
        toggleVideoBtn.disabled = true;
        toggleAudioBtn.disabled = true;
        shareScreenBtn.disabled = true;
        
        // Clear video streams
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
        
        // Update call info
        document.getElementById('callStatus').textContent = 'Call ended';
        document.getElementById('callDuration').textContent = '00:00';
        
        showNotification('Call ended');
    });

    // Toggle video
    toggleVideoBtn.addEventListener('click', function() {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                isVideoEnabled = !isVideoEnabled;
                videoTrack.enabled = isVideoEnabled;
                toggleVideoBtn.classList.toggle('active');
                showNotification(isVideoEnabled ? 'Video enabled' : 'Video disabled');
            }
        }
    });

    // Toggle audio
    toggleAudioBtn.addEventListener('click', function() {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                isAudioEnabled = !isAudioEnabled;
                audioTrack.enabled = isAudioEnabled;
                toggleAudioBtn.classList.toggle('active');
                showNotification(isAudioEnabled ? 'Audio enabled' : 'Audio disabled');
            }
        }
    });

    // Share screen
    shareScreenBtn.addEventListener('click', async function() {
        try {
            if (!isScreenSharing) {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true
                });
                
                const videoTrack = screenStream.getVideoTracks()[0];
                if (peerConnection) {
                    const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
                    if (sender) {
                        sender.replaceTrack(videoTrack);
                    }
                }
                
                isScreenSharing = true;
                shareScreenBtn.classList.add('active');
                showNotification('Screen sharing started');
                
                // Handle screen sharing stop
                videoTrack.onended = function() {
                    isScreenSharing = false;
                    shareScreenBtn.classList.remove('active');
                    showNotification('Screen sharing stopped');
                };
            }
        } catch (error) {
            console.error('Error sharing screen:', error);
            showNotification('Error sharing screen. Please try again.');
        }
    });

    // Initialize video call functionality
    async function initializeVideoCall() {
        try {
            // Get DOM elements
            const startVideoCallBtn = document.getElementById('startVideoCallBtn');
            const toggleVideoBtn = document.getElementById('toggleVideoBtn');
            const toggleAudioBtn = document.getElementById('toggleAudioBtn');
            const shareScreenBtn = document.getElementById('shareScreenBtn');
            const endCallBtn = document.getElementById('endCallBtn');
            const localVideo = document.getElementById('localVideo');
            const remoteVideo = document.getElementById('remoteVideo');

            // Initialize WebRTC
            try {
                localStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                localVideo.srcObject = localStream;
                
                // Enable start call button
                startVideoCallBtn.disabled = false;
                
                // Add event listeners
                startVideoCallBtn.addEventListener('click', startVideoCall);
                toggleVideoBtn.addEventListener('click', toggleVideo);
                toggleAudioBtn.addEventListener('click', toggleAudio);
                shareScreenBtn.addEventListener('click', toggleScreenShare);
                endCallBtn.addEventListener('click', endCall);
                
                // Listen for incoming calls
                listenForIncomingCalls();
                
                showNotification('Video call initialized successfully');
            } catch (error) {
                console.error('Error accessing media devices:', error);
                showNotification('Error accessing camera and microphone. Please check your permissions.');
            }
        } catch (error) {
            console.error('Error initializing video call:', error);
            showNotification('Error initializing video call');
        }
    }

    // Toggle video
    function toggleVideo() {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                isVideoEnabled = !isVideoEnabled;
                videoTrack.enabled = isVideoEnabled;
                document.getElementById('toggleVideoBtn').classList.toggle('active');
                showNotification(isVideoEnabled ? 'Video enabled' : 'Video disabled');
            }
        }
    }

    // Toggle audio
    function toggleAudio() {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                isAudioEnabled = !isAudioEnabled;
                audioTrack.enabled = isAudioEnabled;
                document.getElementById('toggleAudioBtn').classList.toggle('active');
                showNotification(isAudioEnabled ? 'Audio enabled' : 'Audio disabled');
            }
        }
    }

    // Toggle screen sharing
    async function toggleScreenShare() {
        try {
            if (!isScreenSharing) {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                const videoTrack = screenStream.getVideoTracks()[0];
                
                if (peerConnection) {
                    const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
                    if (sender) {
                        sender.replaceTrack(videoTrack);
                    }
                }
                
                isScreenSharing = true;
                document.getElementById('shareScreenBtn').classList.add('active');
                showNotification('Screen sharing started');
                
                videoTrack.onended = () => {
                    toggleScreenShare();
                };
            } else {
                if (peerConnection) {
                    const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
                    if (sender) {
                        const videoTrack = localStream.getVideoTracks()[0];
                        sender.replaceTrack(videoTrack);
                    }
                }
                
                isScreenSharing = false;
                document.getElementById('shareScreenBtn').classList.remove('active');
                showNotification('Screen sharing stopped');
            }
        } catch (error) {
            console.error('Error toggling screen share:', error);
            showNotification('Error toggling screen share');
        }
    }

    // End call
    function endCall() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        
        if (peerConnection) {
            peerConnection.close();
        }
        
        // Reset UI
        document.getElementById('startVideoCallBtn').disabled = false;
        document.getElementById('toggleVideoBtn').disabled = true;
        document.getElementById('toggleAudioBtn').disabled = true;
        document.getElementById('shareScreenBtn').disabled = true;
        document.getElementById('endCallBtn').disabled = true;
        
        // Clear video streams
        document.getElementById('localVideo').srcObject = null;
        document.getElementById('remoteVideo').srcObject = null;
        
        // Update call info
        document.getElementById('callStatus').textContent = 'Call ended';
        document.getElementById('callDuration').textContent = '00:00';
        
        showNotification('Call ended');
    }

    // Start video call
    async function startVideoCall() {
        try {
            // Get user media
            localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            
            // Set local video stream
            document.getElementById('localVideo').srcObject = localStream;
            
            // Enable call controls
            document.getElementById('startVideoCallBtn').disabled = true;
            document.getElementById('toggleVideoBtn').disabled = false;
            document.getElementById('toggleAudioBtn').disabled = false;
            document.getElementById('shareScreenBtn').disabled = false;
            document.getElementById('endCallBtn').disabled = false;
            
            // Update call status
            document.getElementById('callStatus').textContent = 'Connected';
            document.getElementById('callDuration').textContent = '00:00';
            
            // Start call timer
            startCallTimer();
            
            showNotification('Video call started');
        } catch (error) {
            console.error('Error starting video call:', error);
            showNotification('Error starting video call');
        }
    }

    // Listen for incoming calls
    function listenForIncomingCalls() {
        // This would typically integrate with your backend to listen for incoming calls
        // For now, we'll just show a notification
        showNotification('Listening for incoming calls...');
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'call-notification';
        notification.textContent = message;
        
        const notificationsContainer = document.querySelector('.call-notifications') || 
            (() => {
                const container = document.createElement('div');
                container.className = 'call-notifications';
                document.body.appendChild(container);
                return container;
            })();
        
        notificationsContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Start call timer
    function startCallTimer() {
        let seconds = 0;
        const timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            document.getElementById('callDuration').textContent = 
                `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }, 1000);
        
        // Store timer ID for cleanup
        window.callTimer = timer;
    }

    // Initialize video call functionality when the page loads
    initializeVideoCall();

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        if (peerConnection) {
            peerConnection.close();
        }
        if (window.callTimer) {
            clearInterval(window.callTimer);
        }
    });
});
